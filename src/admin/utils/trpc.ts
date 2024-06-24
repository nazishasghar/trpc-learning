import {
    createTRPCReact,
    type inferReactQueryProcedureOptions,
  } from '@trpc/react-query';
  import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { BaseRouter } from '../../server/baseRouter';

export type ReactQueryOptions = inferReactQueryProcedureOptions<BaseRouter>;
export type RouterInputs = inferRouterInputs<BaseRouter>;
export type RouterOutputs = inferRouterOutputs<BaseRouter>;
 
export const trpc = createTRPCReact<BaseRouter>();