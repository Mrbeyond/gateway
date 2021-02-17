import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [{
  id: "dashboard",
  icon: "iconsminds-shop-4",
  label: "Dashboard",
  to: `${adminRoot}`,
},
{
  id: "transactions",
  icon: "fas fa-stream",
  label: "Transactions",
  to: `${adminRoot}/transactions`,

},
{
  id: "customers",
  icon: "simple-icon-people",
  label: "Customers",
  to: `${adminRoot}/customers`
},

{
  id: "payouts",
  icon: "fas fa-money-bill-alt",
  label: "Payouts",
  to: `${adminRoot}/payouts`
},
{
  id: "business",
  icon: "fas fa-business-time",
  label: "Business",
  to: `${adminRoot}/business`,
},
{
id: "invoices",
icon: "fas fa-file-invoice-dollar",
label: "Invoices",
to: `${adminRoot}/invoices`
},
{
  id: "wallets",
  icon: "iconsminds-wallet",
  label: "Wallets",
  to: `${adminRoot}/wallets`
},
// {
//   id: "docs",
//   icon: "iconsminds-library",
//   label: "menu.docs",
//   to: "https://piaf-vue-docs.coloredstrategies.com/",
//   newWindow: true
// }
];
export default data;
