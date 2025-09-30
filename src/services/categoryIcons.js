export const categoryIcons = {
    food: 'utensils',
    travel: 'plane',
    shopping: 'shopping-cart',
    transport: 'bus',
    health: 'heartbeat',
    entertainment: 'film',
    education: 'book',
    salary: 'money-bill-wave',
    freelance: 'laptop-code',
    investment: 'chart-line',
    default: 'ellipsis-h',
    bills: 'file-invoice-dollar',
    gifts: 'gift',
    personal: 'user',
    others: 'question-circle',
};
// src/icons.js
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUtensils,
  faPlane,
  faShoppingCart,
  faBus,
  faHeartbeat,
  faFilm,
  faBook,
  faMoneyBillWave,
  faLaptopCode,
  faChartLine,
  faEllipsisH,
  faFileInvoiceDollar,
  faGift,
  faUser,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUtensils,
  faPlane,
  faShoppingCart,
  faBus,
  faHeartbeat,
  faFilm,
  faBook,
  faMoneyBillWave,
  faLaptopCode,
  faChartLine,
  faEllipsisH,
  faFileInvoiceDollar,
  faGift,
  faUser,
  faQuestionCircle
)
