import { ProcedureResolveOption } from '~/types/procedureReq'

export const useUtilityFunction = () => {
    const generateRandomToken = (length = 25) => {
        const size = Math.ceil(length / 2)
        return crypto.randomUUID().substring(0, size)
    }

    /**
     * Executes a procedure function asynchronously.
     * @template TInput - The type of the Zod object schema for input options.
     * @template TOutput - The return type of the callback function.
     * @param {function(ProcedureResolveOption<T>): Promise<K>} cb - The callback function that performs the procedure.
     * @returns {function(ProcedureResolveOption<T>): Promise<K>} A function that takes options and returns a promise that resolves to the result of the procedure function.
     */
    const procedureFunction =
        <TInput extends Record<string, unknown>, TOutput extends Record<string, unknown> = {}>(
            cb: (opts: ProcedureResolveOption<TInput>) => Promise<TOutput>,
        ): ((arg0: ProcedureResolveOption<TInput>) => Promise<TOutput>) =>
        async (opts: ProcedureResolveOption<TInput>) =>
            await cb(opts)

    return { generateRandomToken, procedureFunction }
}
