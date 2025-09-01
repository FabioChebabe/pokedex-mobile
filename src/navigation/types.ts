/* eslint-disable no-unused-vars */
import { NavigatorScreenParams } from "@react-navigation/native";
import { Pokemon } from "pokenode-ts";

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type ValueOf<T> = T[keyof T];

export type FlattenRouteParams<T extends Record<string, unknown>> =
  T extends NavigatorScreenParams<unknown>
    ? { [K in NonNullable<T["screen"]>]: T["params"] }
    : {
        [K in keyof T]: T[K] extends NavigatorScreenParams<unknown>
          ? FlattenRouteParams<T[K]>
          : T[K];
      };

export type FlattenNavigationParamListBase = UnionToIntersection<
  FlattenRouteParams<ValueOf<ParamListBase>>
>;

export type FlattenParamListBase = UnionToIntersection<
  FlattenRouteParams<ParamListBase>
>;

export type ParamListBase = {
  Home: undefined;
  Details: { pokemon: Pokemon | undefined };
};

type Primitive = string | boolean | number | symbol | undefined | null;

export type OnlyPrimitives<TObj> = TObj extends Primitive
  ? TObj
  : TObj extends (infer TArray)[]
    ? OnlyPrimitives<TArray>[]
    : TObj extends (...args: unknown[]) => unknown
      ? unknown
      : TObj extends Record<string | number | symbol, unknown>
        ? { [key in keyof TObj]: OnlyPrimitives<TObj[key]> }
        : TObj;

export type ParamList = OnlyPrimitives<
  FlattenNavigationParamListBase & FlattenParamListBase
>;
