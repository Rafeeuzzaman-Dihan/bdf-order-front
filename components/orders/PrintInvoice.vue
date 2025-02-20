<template>
  <div>

    <Icon @click="printInvoice" name="ph:printer-fill" size="24" class="text-orange-500 cursor-pointer"></Icon>

  </div>
</template>


<script setup lang="ts">

import { jsPDF } from "jspdf";

const { values } = defineProps(["values"]);



const printInvoice = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Invoice", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text("BD Shop", 150, 20);
  doc.text("Address: " + values.address, 150, 30);
  doc.text("Invoice No: " + values.order_id, 150, 40);

  doc.line(10, 50, 200, 50);

  doc.text("Customer Details:", 10, 60);
  doc.text("Name: " + values.name, 10, 70);
  doc.text("Address: " + values.address, 10, 80);
  doc.text("Phone: " + values.phone, 10, 90);
  doc.text("Order Date: " + values.createdAt, 10, 100);
  doc.text("Email: " + values.email, 10, 110);

let y = 130;
  doc.setFontSize(12);
  doc.text("Item", 10, y);
  doc.text("Quantity", 80, y);
  doc.text("Rate", 120, y);
  doc.text("Total", 160, y);
  doc.line(10, y + 2, 200, y + 2); 

  y += 10;

  values.orderItems.forEach((item: any) => {
    doc.text(item.product_name, 10, y);
    doc.text(item.quantity.toString(), 80, y);
    doc.text(item.price.toString(), 120, y);
    doc.text(item.total.toString(), 160, y);
    y += 10;
  });

  doc.line(10, y, 200, y);

  const subTotal = values.orderItems.reduce((sum: number, item: any) => sum + item.total, 0);
  const discount = values.orderItems.reduce((sum: number, item: any) => sum + (item.discount || 0), 0);
  const total = subTotal - discount;

  
  y += 10;
  doc.text("Sub Total: " + subTotal.toFixed(2), 150, y);
  doc.text("Discount: " + discount.toFixed(2), 150, y + 10);
  doc.text("Total: " + total.toFixed(2), 150, y + 20);

  doc.autoPrint();
  window.open(doc.output("bloburl"), "_blank");

}

</script>
