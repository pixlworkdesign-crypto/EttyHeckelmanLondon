import { productFragment, cartFragment, imageFragment } from "./fragments";

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections($first: Int!) {
    collections(first: $first, sortKey: TITLE) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            ...image
          }
        }
      }
    }
  }
  ${imageFragment}
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
    $first: Int!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        ...image
      }
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;

// Site-wide settings the merchant controls from Shopify (a "site_settings"
// metaobject with image fields "logo" and "hero_image").
export const getSiteSettingsQuery = /* GraphQL */ `
  query getSiteSettings {
    metaobjects(type: "site_settings", first: 1) {
      edges {
        node {
          logo: field(key: "logo") {
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
          }
          hero: field(key: "hero_image") {
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
          }
          layout: field(key: "hero_layout") { value }
          email: field(key: "contact_email") { value }
          phone: field(key: "contact_phone") { value }
          whatsapp: field(key: "whatsapp_number") { value }
          address: field(key: "address") { value }
          hours: field(key: "opening_hours") { value }
        }
      }
    }
  }
`;
