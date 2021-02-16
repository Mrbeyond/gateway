import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [{
  id: "dashboards",
  icon: "iconsminds-shop-4",
  label: "Dashboards",
  to: `${adminRoot}`,
},
{
  id: "pages",
  icon: "iconsminds-credit-card",
  label: "Transaction",
  to: `${adminRoot}/pages`,
  
},
{
  id: "applications",
  icon: "simple-icon-people",
  label: "Customers",
  to: `${adminRoot}/customers`
},



{
  id: "business",
  icon: "iconsminds-data-storage",
  label: "Business",
  to: `${adminRoot}/business`,
 /* subs: [
  {
    icon: "simple-icon-layers",
    label: "menu.business",
    to: `${adminRoot}/businesses`,

  },
  {
    icon: "simple-icon-layers",
    label: "menu.payout-wallets",
    to: `${adminRoot}/menu/levels`,


  },
  {
    icon: "simple-icon-layers",
    label: "menu.api-keys",
    to: `${adminRoot}/menu/levels`,

  },
  ]*/
},
{
  id: "blank-page",
  icon: "iconsminds-wallet",
  label: "Wallet",
  to: `${adminRoot}/blank-page`
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
