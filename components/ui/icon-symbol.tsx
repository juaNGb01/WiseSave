import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faChartSimple, faCartShopping, faUser, faPlus, faUserPen, faLock, faEnvelope, faTrash
  , faFilePen, faClockRotateLeft
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

const NEW_ICONS: Record<string, IconDefinition> = {
  "chart-simple": faChartSimple,
  "home": faCartShopping,
  "user": faUser,
  "plus": faPlus,
  "userPen": faUserPen,
  "password": faLock,
  "email": faEnvelope,
  "delete": faTrash,
  "filePen": faFilePen,
  "clock" : faClockRotateLeft
  // Adicione mais ícones aqui conforme precisar
};

type IconSymbolProps = {
  name: keyof typeof NEW_ICONS;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
};

export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  const icon = NEW_ICONS[name];

  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      color={color as string}
    />
  );
}

