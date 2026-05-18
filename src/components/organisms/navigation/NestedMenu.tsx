import { Menu, type MenuProps } from "./Menu";

export function NestedMenu<TRole extends string = string>(props: MenuProps<TRole>) {
  return <Menu {...props} orientation={props.orientation ?? "vertical"} />;
}
