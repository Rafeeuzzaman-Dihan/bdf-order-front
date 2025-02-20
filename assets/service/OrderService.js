export const ordersDemo = [
  {
    order: 
      {
        order_id: 250126001,
        order_date: "26-01-2025",
        order_time: "01:57 PM"
      }
    ,
    customer: {
      name: "Hasan",
      status: "REG",
      phone: "+8801756392618",
      email: "ziaulhasanf@gmail.com",
      address: "Merul Badda, Dhaka"
    },
    product: {
      name: "product1",
      quantity: 1,
      material: "iron",
      description: "iron product"
    },
    pricing: {
      subtotal: 7,
      delivery_fee: 5,
      discount: 4,
      grand_total: 8,
      paid: 0,
      due: 8,
      status:"Unpaid"
    },
    actions: {
      select_courier: [
         { name:"DHL"},
         {name: "Pathao"},
         {name: "PaperFly",},
          {name:"Local"}
        ],
        pending_status:  [
          { name: "Pending", color: "#468ef2", icon: "material-symbols:pending-actions" },        // Blue
          { name: "Followup", color: "#a259ff", icon: "mynaui:brightness-high-solid" },           // Purple
          { name: "Confirmed", color: "#00c853", icon: "line-md:circle-filled-to-confirm-circle-filled-transition" }, // Green
          { name: "Ready To Ship", color: "#0091ea", icon: "material-symbols-light:delivery-truck-speed-rounded" },  // Light Blue
          { name: "Shipped", color: "#5e35b1", icon: "f7:shippingbox-fill" }, // Dark Purple
          { name: "Delivered", color: "#00c853", icon: "hugeicons:package-delivered" },          // Green
          { name: "Returned", color: "#d500f9", icon: "ic:outline-keyboard-return" }             // Magenta/Pink
        ],

     
    }
  }
];

export const courierService =[
  { name:"DHL"},
  {name: "Pathao"},
  {name: "PaperFly",},
   {name:"Local"}
 ]

export const orderStatusService = [
{ name: "Pending", color: "#468ef2", icon: "material-symbols:pending-actions" },        // Blue
{ name: "Followup", color: "#a259ff", icon: "mynaui:brightness-high-solid" },           // Purple
{ name: "Confirmed", color: "#00c853", icon: "line-md:circle-filled-to-confirm-circle-filled-transition" }, // Green
{ name: "Ready To Ship", color: "#0091ea", icon: "material-symbols-light:delivery-truck-speed-rounded" },  // Light Blue
{ name: "Shipped", color: "#5e35b1", icon: "f7:shippingbox-fill" }, // Dark Purple
{ name: "Delivered", color: "#00c853", icon: "hugeicons:package-delivered" },          // Green
{ name: "Returned", color: "#d500f9", icon: "ic:outline-keyboard-return" }             // Magenta/Pink
]

export const agentService =  [
{ name:  "UAA"},
{name: "Africa"},
{name: "Asia"}
]

export const orderService = [
{
  "_id": "67a3419766be2f2e7cfeedb7",
  "name": "Customer 8",
  "phone": "0123456789",
  "email": "customer8@example.com",
  "address": "Thi is dummy Address 8",
  "source": "website",
  "status": "pending",
  "payment_method": "cash",
  "identifier": "ORDER-00000",
  "courier_name": "Courier 9",
  "quantity": 3,
  "order_id": "ORDER-00000",
  "courier": "67a3419666be2f2e7cfeed9e",
  "createdAt": "2025-02-05T10:46:47.288Z",
  "updatedAt": "2025-02-05T10:46:47.288Z",
  "__v": 0,
  "orderItems": [
      {
          "_id": "67a3419766be2f2e7cfeedb8",
          "product_name": "Amar Pant 3",
          "attributes": [
              {
                  "color": "red"
              }
          ],
          "quantity": 3,
          "price": 1200,
          "discount": 0,
          "total": 3600,
          "product": "67a3419666be2f2e7cfeeda4",
          "order": "67a3419766be2f2e7cfeedb7",
          "createdAt": "2025-02-05T10:46:47.230Z",
          "updatedAt": "2025-02-05T10:46:47.230Z",
          "__v": 0
      }
  ],
  "id": "67a3419766be2f2e7cfeedb7"
},
]