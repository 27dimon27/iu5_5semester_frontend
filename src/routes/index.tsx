export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  SERVICE: "/services/:id",
  CART: "/cart",
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  SERVICES: "Услуги",
  SERVICE: "Услуга",
  CART: "Корзина",
};