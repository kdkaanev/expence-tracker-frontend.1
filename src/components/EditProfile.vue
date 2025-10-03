<script setup>
    import { ref, onMounted } from "vue";
    import { useAuthStore } from "../store/authStore";
    import Inputs from "./ui/Inputs.vue";
    import Button from "./ui/Button.vue";


    
    const authStore = useAuthStore();
    const formData = ref({
      first_name: "",
      last_name: ""
    });

    onMounted(() => {
      if (authStore.user && authStore.user.profile) {
        formData.value.first_name = authStore.user.profile.first_name || "";
        formData.value.last_name = authStore.user.profile.last_name || "";
      }
      console.log(formData.value);
    });

    const onEdit = async () => {
      try {
        await authStore.updateProfile(formData.value);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    };

</script>




<template>
 <article>
   <section class="container">
      <h1>Edit Profile</h1>
      <p>Please edit  your profile.</p>

      <form @submit.prevent="onEdit">
        <Inputs type="text" v-model="formData.value.first_name" placeholder="Enter your first name"  />
        <Inputs type="text" v-model="formData.value.last_name" placeholder="Enter your last name"  />
        <Button variant="primary" class="btn-login">Save</Button>
      </form>
   </section>
 </article>
</template>

<style scoped>
.btn-login{
  width: 100%;
  margin-top: 1rem;
}
 article {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f5f5f5;
}
.container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  height: 90%;
  text-align: center;
  overflow: hidden;
}
</style>