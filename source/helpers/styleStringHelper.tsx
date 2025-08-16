import { scale } from "../abstract/StyleProvider";

export function transform(x: number, y: number): string {
    return `translate(${scale(x)}px, ${scale(y)}px)`;
}