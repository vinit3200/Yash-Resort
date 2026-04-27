import {
  Armchair,
  Bed,
  ChefHat,
  Coffee,
  Crown,
  Droplets,
  Leaf,
  Lock,
  Maximize2,
  Trees,
  Tv,
  Waves,
  Wifi,
  Wind
} from "lucide-react";

const AMENITY_ICON_RULES = [
  { test: /(air|ac|climate|cool)/i, Icon: Wind },
  { test: /(wifi|wi-fi|internet|bluetooth)/i, Icon: Wifi },
  { test: /(tv|led|smart)/i, Icon: Tv },
  { test: /(tea|coffee|mini bar|wine|beverage)/i, Icon: Coffee },
  { test: /(bath|bathroom|shower|toilet|jacuzzi|spa)/i, Icon: Droplets },
  { test: /(bed|king|twin|double|bedroom)/i, Icon: Bed },
  { test: /(living|seating|lounge|sofa|layout)/i, Icon: Armchair },
  { test: /(garden|nature|valley|deck|outdoor)/i, Icon: Trees },
  { test: /(lake|pool|water|view)/i, Icon: Waves },
  { test: /(chef|kitchen|meal)/i, Icon: ChefHat },
  { test: /(safe|locker|lock|private entry)/i, Icon: Lock },
  { test: /(space|spacious|size)/i, Icon: Maximize2 },
  { test: /(premium|exclusive|luxury|service|concierge|butler)/i, Icon: Crown }
];

export function getAmenityIconComponent(amenityName = "", fallback = Leaf) {
  const normalizedAmenityName = String(amenityName).toLowerCase();
  const matchedRule = AMENITY_ICON_RULES.find((rule) =>
    rule.test.test(normalizedAmenityName)
  );

  return matchedRule?.Icon ?? fallback;
}

