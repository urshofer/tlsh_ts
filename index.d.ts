export declare const hist_diff1_add = 1;
export declare const hist_diff2_add = 2;
export declare const hist_diff3_add = 6;
export declare type Quartile = {
    q1: number;
    q2: number;
    q3: number;
};
/**
 * Tlsh class. It's a main class that user will use.
 * This class is a port from TLSH js implementation in official repository.
 */
export declare class Tlsh {
    protected checksum: Uint8Array;
    protected slide_window: Uint8Array;
    protected a_bucket: Uint32Array;
    protected data_len: number;
    protected tmp_code: Uint8Array;
    protected Lvalue: number;
    protected Q: number;
    protected lsh_code: String;
    protected lsh_code_valid: boolean;
    /** Create a new Tlsh instance. */
    constructor();
    /**
     * Allow caller to pass in length in case there are embedded null characters, as there
     * are in strings str_1 and str_2 (see simple_test.cpp)
     *
     * length parameter defaults to str.length
     */
    update(str: Uint8Array | string, length?: number): void;
    /**
     * Finalize the calculation.
     * It may take two optional arguments. One is a last chunk of data.
     * Another is length of last chunk of data.
     */
    finale(str?: Uint8Array | string, length?: number): void;
    /** Retrieve hash of entire data. */
    hash(): String;
    /** Reset hasher to original state before having any data feed into it. */
    reset(): void;
    /** Calculate difference score between two instance of Tlsh. */
    totalDiff(other: Tlsh, len_diff?: boolean): number;
    protected find_quartile(quartiles: Quartile): void;
    /** len_diff defaults to true */
    fromTlshStr(str: string): void;
}
//# sourceMappingURL=index.d.ts.map