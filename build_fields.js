import gql from "graphql-tag";
import { buildFields } from "ra-data-hasura";
import { buildUpdateVariables } from "ra-data-hasura/dist/buildVariables/buildUpdateVariables";
import {
  GET_ONE,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  DELETE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE_MANY,
} from "ra-data-hasura/dist/helpers/fetchActions";
import { buildGetListVariables } from "ra-data-hasura/dist/buildVariables/buildGetListVariables";
import { buildCreateVariables } from "ra-data-hasura/dist/buildVariables/buildCreateVariables";
import { makeNestedTarget } from "ra-data-hasura/dist/buildVariables/makeNestedTarget";
import {
  // assignSortField,
  assignQuery,
  assignQueryForMany,
} from "../../utilities";
/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst) => {
  return queryAst.definitions[0].selectionSet.selections;
};

const GET_ONE_USERS = gql`
  {
    subscriptions(where: { status: { _in: ["active", "paused"] } }) {
      offering {
        subs_basket_lookup: lookup_basket_id
      }
      status
    }
  }
`;

const GET_MANY_REFERENCE_ORDER_LINE_ITEMS = gql`
  {
    product {
      product_name
    }
  }
`;

const GET_LIST_ORDERS = gql`
  {
    subscription {
      status
      basket_id
      offering {
        basket_family
      }
    }
    user {
      id
      name
    }
  }
`;

const GET_MANY_ORDERS = gql`
  {
    subscription {
      basket_id
    }
  }
`;

const GET_LIST_SUBSCRIPTION = gql`
  {
    user {
      name
    }
    offering {
      lookup_basket_id
    }
  }
`;

const GET_LIST_USERS = gql`
  {
    orders_aggregate(where: { order_status: { _eq: "Fulfilled" } }) {
      aggregate {
        min {
          created_at
        }
        max {
          created_at
        }
      }
    }
    subscriptions(where: { status: { _in: ["active", "paused"] } }) {
      offering {
        subs_basket_lookup: lookup_basket_id
      }
      status
    }
  }
`;

const GET_LIST_PRODUCTS = gql`
  {
    basket_size {
      lookup_basket_sizes
    }
  }
`;

const customBuildField = (type, fetchType) => {
  const resourceName = type.name;

  // First take the default fields (all, but no related or nested).
  const defaultFields = buildFields(type, fetchType);
  if (
    resourceName === "order_line_items" &&
    fetchType === "GET_MANY_REFERENCE"
  ) {
    const relatedEntities = extractFieldsFromQuery(
      GET_MANY_REFERENCE_ORDER_LINE_ITEMS
    );
    defaultFields.push(...relatedEntities);
  }
  if (resourceName === "orders" && fetchType === "GET_LIST") {
    const relatedEntities = extractFieldsFromQuery(GET_LIST_ORDERS);
    defaultFields.push(...relatedEntities);
  }
  if (resourceName === "orders" && fetchType === "GET_MANY") {
    const relatedEntities = extractFieldsFromQuery(GET_MANY_ORDERS);
    defaultFields.push(...relatedEntities);
  }
  if (resourceName === "subscriptions" && fetchType === "GET_LIST") {
    const relatedEntities = extractFieldsFromQuery(GET_LIST_SUBSCRIPTION);
    defaultFields.push(...relatedEntities);
  }
  if (resourceName === "users" && fetchType === "GET_LIST") {
    const relatedEntities = extractFieldsFromQuery(GET_LIST_USERS);
    defaultFields.push(...relatedEntities);
  }
  if (resourceName === "products" && fetchType === "GET_LIST") {
    const relatedEntities = extractFieldsFromQuery(GET_LIST_PRODUCTS);
    defaultFields.push(...relatedEntities);
  }
  if (resourceName === "users" && fetchType === "GET_ONE") {
    const relatedEntities = extractFieldsFromQuery(GET_ONE_USERS);
    defaultFields.push(...relatedEntities);
  }
  return defaultFields;
};

export const customVariables =
  (introspectionResults) => (resource, aorFetchType, params, queryType) => {
    let query = {};

    switch (aorFetchType) {
      case GET_LIST:
        // assignSortField(queryType.name, params);

        return buildGetListVariables(introspectionResults)(
          resource,
          aorFetchType,
          params
        );
      case GET_MANY_REFERENCE: {
        var built = buildGetListVariables(introspectionResults)(
          resource,
          aorFetchType,
          params
        );
        if (params.filter) {
          return {
            ...built,
            where: {
              _and: [
                ...built["where"]["_and"],
                makeNestedTarget(params.target, params.id),
              ],
            },
          };
        }
        return {
          ...built,
          where: makeNestedTarget(params.target, params.id),
        };
      }
      case GET_MANY:
      case DELETE_MANY:
        return assignQueryForMany(query, queryType.name, params.ids);

      case GET_ONE:
        return assignQuery(query, queryType.name, params.id, true);

      case DELETE:
        return assignQuery(query, queryType.name, params.id, false);

      case CREATE:
        return {
          objects: buildCreateVariables(introspectionResults)(
            resource,
            aorFetchType,
            params,
            queryType
          ),
        };

      case UPDATE:
        query._set = buildUpdateVariables(introspectionResults)(
          resource,
          aorFetchType,
          params,
          queryType
        );
        return assignQuery(query, queryType.name, params.id, false);

      case UPDATE_MANY:
        return {
          _set: buildUpdateVariables(introspectionResults)(
            resource,
            aorFetchType,
            params,
            queryType
          ),
          where: { id: { _in: params.ids } },
        };

      default:
        break;
    }
  };

export default customBuildField;