import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import buildHasuraProvider from "ra-data-hasura";
import React, { useEffect, useState } from "react";
import { Admin, defaultTheme, Resource } from "react-admin";
import { FirebaseAuthProvider } from "react-admin-firebase";
import customBuildField, {
  customVariables,
} from "./components/Graphql_Extension/build_fields";

import { Dashboard } from "./components/Dashboard/dashboard";

import { CreateUser } from "./components/User/CreateUser";
import { UserEdit } from "./components/User/UserEdit";
import { UserList } from "./components/User/UsersList";
import { UsersShow } from "./components/User/UsersShow";

import { PlanCreate } from "./components/Plan/PlanCreate";
import { PlanEdit } from "./components/Plan/PlanEdit";
import { PlanShow } from "./components/Plan/PlanShow";
import { PlanList } from "./components/Plan/plansList";

import { CreateProduct } from "./components/Product/CreateProduct";
import { ProductEdit } from "./components/Product/ProductEdit";
import { ProductList } from "./components/Product/productList";
import { ProductShow } from "./components/Product/ProductShow";

import { CreateSku } from "./components/Sku/CreateSku";
import { SkuEdit } from "./components/Sku/SkuEdit";
import { SkuList } from "./components/Sku/SkuList";
import { SkuShow } from "./components/Sku/SkuShow";

import { OrdersEdit } from "./components/Order/OrdersEdit";
import { OrderList } from "./components/Order/OrdersList";
import { OrderShow } from "./components/Order/OrdersShow";

import { DispatchOrderEdit } from "./components/Dispatch Orders/dispatch_order_edit";
import { DispatchOrders } from "./components/Dispatch Orders/dispatch_order_list";

import { SkuPackingList } from "./components/Sku_Packing_List/SkuPackingList";

import { CreateSubscription } from "./components/Subscription/CreateSubscription";
import { SubscriptionEdit } from "./components/Subscription/SubscriptionEdit";
import { SubscriptionList } from "./components/Subscription/SubscriptionList";
import { SubscriptionShow } from "./components/Subscription/SubscriptionShow";

import { CreateSupplier } from "./components/Supplier/CreateSupplier";
import { SupplierEdit } from "./components/Supplier/SupplierEdit";
import { SupplierShow } from "./components/Supplier/SupplierShow";
import { SupplierList } from "./components/Supplier/SuppliersList";

import { SupplierIndentList } from "./components/Supplier_Indent/SupplierIndentList";

import { assignId } from "./utilities";

import { ShortfallsList } from "./components/Shortfalls/ShortfallsList";

import { green, yellow } from "@material-ui/core/colors";
import { PickListEdit } from "./components/Pick List/PickListEdit";
import { PickListReport } from "./components/Pick List/PicklistReport";

import { ShortfallsShow } from "./components/Shortfalls/ShortfallsShow";
import { Shortfalls_Dispatch_Order } from "./components/Shortfall_Reports/Shortfalls_Dispatch_Order";
import { Shortfalls_picklist } from "./components/Shortfall_Reports/Shortfalls_picklist";
import { Shortfalls_skupackinglist } from "./components/Shortfall_Reports/Shortfalls_skupackinglist";
import { Shortfalls_Supplierindent } from "./components/Shortfall_Reports/Shortfalls_Supplierindent";
import { SupplierIndentEdit } from "./components/Supplier_Indent/SupplierIndentEdit";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
const authProvider = FirebaseAuthProvider(config);

console.log(process.env.REACT_APP_);

const GRAPHQL_API_ENDPOINT = process.env.REACT_APP_GRAPHQL_API_ENDPOINT;

const httpLink = createHttpLink({
  uri: GRAPHQL_API_ENDPOINT,
});

const authMiddleware = setContext((operation) =>
  authProvider.getJWTToken().then((token) => {
    return {
      headers: {
        authorization: `Bearer ${token}` || null,
      },
    };
  })
);

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

const myTheme = {
  ...defaultTheme,
  palette: {
    primary: green,
    secondary: yellow,
  },
};

const App = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const [userrole, setUserRole] = useState("customer_care");
  useEffect(() => {
    const getPermissions = async () => {
      const permissions = await authProvider.getPermissions();
      if (permissions) {
        setUserRole(
          permissions["https://hasura.io/jwt/claims"]["x-hasura-default-role"]
        );
      }
    };

    const buildDataProvider = async () => {
      const dataProviderHasura = await buildHasuraProvider(
        {
          client: client,
        },
        { buildFields: customBuildField },
        customVariables
      );

      //Modified column mappings
      const modifiedProvider = {
        getList: async (resource, params) => {
          let { data, ...metadata } = await dataProviderHasura.getList(
            resource,
            params
          );

          data = assignId(resource, data, true);

          return {
            data: data,
            ...metadata,
          };
        },
        getOne: async (resource, params) => {
          let { data, ...metadata } = await dataProviderHasura.getOne(
            resource,
            params
          );

          data = assignId(resource, data);

          return {
            data: data,
            ...metadata,
          };
        },
        getMany: async (resource, params) => {
          let { data, ...metadata } = await dataProviderHasura.getMany(
            resource,
            params
          );

          data = assignId(resource, data, true);

          return {
            data: data,
            ...metadata,
          };
        },
        getManyReference: async (resource, params) => {
          let { data, ...metadata } = await dataProviderHasura.getManyReference(
            resource,
            params
          );

          data = assignId(resource, data, true);

          return {
            data: data,
            ...metadata,
          };
        },
        update: async (resource, params) => {
          let { data, ...metadata } = await dataProviderHasura.update(
            resource,
            params
          );

          data = assignId(resource, data, false);

          return {
            data: data,
            ...metadata,
          };
        },
        updateMany: (resource, params) =>
          dataProviderHasura.updateMany(resource, params),
        create: async (resource, params) => {
          let { data, ...metadata } = await dataProviderHasura.create(
            resource,
            params
          );

          data = assignId(resource, data, false);

          return {
            data: data,
            ...metadata,
          };
        },
        delete: (resource, params) =>
          dataProviderHasura.delete(resource, params),
        deleteMany: (resource, params) =>
          dataProviderHasura.deleteMany(resource, params),
      };

      setDataProvider(() => modifiedProvider);
    };
    buildDataProvider();
    getPermissions();
  }, []);

  if (!dataProvider || !userrole) return <p>Loading...</p>;
  return (
    <Admin
      dashboard={userrole === "admin" ? Dashboard : null}
      dataProvider={dataProvider}
      authProvider={authProvider}
      theme={myTheme}
      requireAuth>
      <Resource
        name="users"
        options={{ label: "Users" }}
        list={
          userrole === "admin" || userrole === "customer_care" ? UserList : null
        }
        icon={PeopleIcon}
        edit={userrole === "admin" ? UserEdit : null}
        create={userrole === "admin" ? CreateUser : null}
        show={userrole === "admin" ? UsersShow : null}
      />
      <Resource
        name="products"
        options={{ label: "Sku" }}
        list={
          userrole === "admin" || userrole === "customer_care" ? SkuList : null
        }
        edit={userrole === "admin" ? SkuEdit : null}
        create={userrole === "admin" ? CreateSku : null}
        show={SkuShow}
      />
      <Resource
        name="product_info"
        list={
          userrole === "admin" || userrole === "customer_care"
            ? ProductList
            : null
        }
        options={{ label: "Products" }}
        edit={userrole === "admin" ? ProductEdit : null}
        create={userrole === "admin" ? CreateProduct : null}
        show={ProductShow}
      />
      <Resource
        name="offerings"
        options={{ label: "Plans" }}
        create={PlanCreate}
        list={
          userrole === "admin" || userrole === "customer_care" ? PlanList : null
        }
        icon={BookIcon}
        edit={userrole === "admin" ? PlanEdit : null}
        show={userrole === "admin" ? PlanShow : null}
      />
      <Resource
        name="subscriptions"
        options={{ label: "Subscription" }}
        list={
          userrole === "admin" || userrole === "customer_care"
            ? SubscriptionList
            : null
        }
        edit={userrole === "admin" ? SubscriptionEdit : null}
        create={userrole === "admin" ? CreateSubscription : null}
        show={userrole === "admin" ? SubscriptionShow : null}
      />
      <Resource
        name="suppliers"
        options={{ label: "Suppliers" }}
        show={SupplierShow}
        list={
          userrole === "admin" || userrole === "customer_care"
            ? SupplierList
            : null
        }
        edit={SupplierEdit}
        create={CreateSupplier}
      />
      <Resource
        name="orders"
        options={{ label: "Orders" }}
        list={
          userrole === "admin" || userrole === "customer_care"
            ? OrderList
            : null
        }
        edit={OrdersEdit}
        show={OrderShow}
      />
      <Resource
        name="supplier_indent"
        options={{ label: "Supplier Indent" }}
        list={SupplierIndentList}
        edit={
          userrole === "admin" || userrole === "customer_care"
            ? SupplierIndentEdit
            : null
        }
      />
      <Resource
        name="sku_packing_list"
        options={{ label: "SKU packing list" }}
        list={SkuPackingList}
      />
      <Resource
        name="pick_list"
        options={{ label: "Pick List" }}
        list={PickListReport}
        edit={
          userrole === "admin" || userrole === "operator" ? PickListEdit : null
        }
      />
      <Resource
        name="orderdispatchtable"
        options={{ label: "Dispatch Orders" }}
        list={DispatchOrders}
        edit={userrole === "admin" ? DispatchOrderEdit : null}
      />

      {/* {
        <Resource
          name="order_line_items"
          options={{ label: "Supplier Indent" }}
          list={SupplierIndentReportList}
        />
      } */}
      {/* {
        <Resource
          name="order_line_items"
          options={{ label: "Pick list" }}
          list={PickListReport}
        />
      } */}

      <Resource
        name="shortfalls"
        options={{ label: "Shortfalls" }}
        list={ShortfallsList}
        show={ShortfallsShow}
      />

      <Resource
        name="shorfalls_orderdispatchtable"
        options={{ label: "Sf's Dispatch Order" }}
        list={Shortfalls_Dispatch_Order}
      />
      <Resource
        name="shortfalls_pick_list"
        options={{ label: "Sf's Pick List" }}
        list={Shortfalls_picklist}
      />
      <Resource
        name="shortfalls_sku_packing_list"
        options={{ label: "Sf's Sku Packing List" }}
        list={Shortfalls_skupackinglist}
      />
      <Resource
        name="shortfalls_supplier_indent"
        options={{ label: "Sf's Supplier Indent" }}
        list={Shortfalls_Supplierindent}
      />
    </Admin>
  );
};

export default App;