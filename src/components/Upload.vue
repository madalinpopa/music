<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="
          w-full
          px-10
          py-20
          rounded
          text-center
          cursor-pointer
          border border-dashed border-gray-400
          text-gray-400
          transition
          duration-500
          hover:text-white
          hover:bg-green-400
          hover:border-green-400 hover:border-solid
        "
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i>{{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar bg-blue-400"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
       </div>
    </div>
  </div>
</template>
<script>
import {
  storage,
  ref,
  uploadBytesResumable,
  auth,
  setDocument,
  getDownloadURL,
  getDocumentByReference,
} from '@/includes/firebase';

export default {
  name: 'Upload',
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  props: ['addSong'],
  methods: {
    upload($event) {
      this.is_dragover = false;

      // converting an object to an array
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];

      // for each file in the above array
      files.forEach((file) => {
        // if is not audio, return
        if (file.type !== 'audio/mpeg') {
          return;
        }

        // create reference to the file
        const songsRef = ref(storage, `songs/${file.name}`);
        const metadata = {
          contentType: 'audio/mpeg',
          name: file.name,
        };

        // upload file to firstore
        const task = uploadBytesResumable(songsRef, file, metadata);

        // add data to uploads array, which will display the loading
        const uploadIndex = this.uploads.push({
          task,
          current_progress: 0,
          name: file.name,
          variants: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin',
          text_class: '',
        }) - 1;

        // when file state is changes (is uploaded)
        task.on(
          'state_changed',
          (snapshot) => {
            // get the progress and upload the progress in uploads file
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            // update error display in case the file upload failed
            this.uploads[uploadIndex].variant = 'bg-red-400';
            this.uploads[uploadIndex].icon = 'fas fa-times';
            this.uploads[uploadIndex].text_class = 'text-red-400';
            console.log(error);
          },
          async () => {
            // create song document
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: '',
              comment_count: 0,
            };

            song.url = await getDownloadURL(task.snapshot.ref);

            // create song document in firestore
            const songRef = await setDocument('songs', song);

            // get the snapshopt
            const songSnapshot = await getDocumentByReference(songRef.id);

            // console.log(songRef.id);
            // console.log(songSnapshot);

            // refresh the list with uploded songs in the manage page
            this.addSong(songSnapshot);

            this.uploads[uploadIndex].variant = 'bg-green-400';
            this.uploads[uploadIndex].icon = 'fas fa-check';
            this.uploads[uploadIndex].text_class = 'text-green-400';
          },
        );
      });
      // console.log(files);
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};
</script>
