import { atom } from "jotai";
import { WidgetScreen } from "@/modules/types";
// Basic atom
export const screenAtom = atom<WidgetScreen>("auth");
