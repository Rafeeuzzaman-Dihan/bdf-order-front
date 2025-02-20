<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";

definePageMeta({
  layout: 'blank',
  middleware: 'guest'
})

const {getStart} = useAuthStore()
</script>

<template>
  <div class="container mx-auto my-2">
    <!-- About Us Section -->
    <section class="bg-white py-16 px-6 text-center">
      <h1 class="text-4xl font-bold text-blue-600">About Our Company</h1>
      <p class="mt-4 text-lg max-w-3xl mx-auto">
        We are committed to providing the best services for our customers, ensuring quality, affordability, and
        innovation.
        Our mission is to help businesses grow with our top-notch solutions.
      </p>
    </section>

    <!-- Get Started Section -->
    <section class="bg-blue-600 text-white text-center py-16 px-6">
      <h2 class="text-3xl font-bold">Ready to Get Started?</h2>
      <p class="mt-4 text-lg">Join us today and take your business to the next level.</p>
      <button @click="getStart" class="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg">Get
        Started
      </button>
    </section>

    <!-- Pricing Section -->
    <section class="py-16 px-6 text-center">
      <h2 class="text-4xl font-bold text-blue-600">Pricing Plans</h2>
      <p class="mt-4 text-lg max-w-3xl mx-auto">
        Choose the best plan that fits your needs. Our flexible pricing ensures that everyone gets the value they
        deserve.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">

        <div class="bg-white shadow-lg p-6 rounded-lg">
          <h3 class="text-xl font-semibold">Basic</h3>
          <p class="text-4xl font-bold text-blue-600">$100</p>
          <p class="text-gray-500">per month</p>
          <ul class="mt-4 text-gray-700 text-left">
            <li>&#10003; 10 Projects</li>
            <li>&#10003; Basic Support</li>
            <li>&#10003; Access to Core Features</li>
          </ul>
          <button class="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Buy Now</button>
        </div>

        <div class="bg-white shadow-lg p-6 rounded-lg border-2 border-blue-600">
          <h3 class="text-xl font-semibold">Standard</h3>
          <p class="text-4xl font-bold text-blue-600">$200</p>
          <p class="text-gray-500">per month</p>
          <ul class="mt-4 text-gray-700 text-left">
            <li>&#10003; 50 Projects</li>
            <li>&#10003; Priority Support</li>
            <li>&#10003; Advanced Features</li>
          </ul>
          <button class="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Buy Now</button>
        </div>

        <div class="bg-white shadow-lg p-6 rounded-lg">
          <h3 class="text-xl font-semibold">Premium</h3>
          <p class="text-4xl font-bold text-blue-600">$300</p>
          <p class="text-gray-500">per month</p>
          <ul class="mt-4 text-gray-700 text-left">
            <li>&#10003; Unlimited Projects</li>
            <li>&#10003; 24/7 Support</li>
            <li>&#10003; All Premium Features</li>
          </ul>
          <button class="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Buy Now</button>
        </div>
      </div>
    </section>
  </div>

  <!-- Footer Section -->
  <footer class="bg-gray-900 text-white text-center py-8">
    <p>&copy; 2025 Our Company. All rights reserved.</p>
    <div class="flex justify-center mt-4 space-x-4">
      <a href="#" class="hover:text-blue-400">Privacy Policy</a>
      <a href="#" class="hover:text-blue-400">Terms of Service</a>
      <a href="#" class="hover:text-blue-400">Contact</a>
    </div>
  </footer>
</template>