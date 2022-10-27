export declare const bit_pairs_diff_table: Uint8Array[];
export declare const topval: Uint32Array;
export declare function l_capturing(len: number): number;
export declare function mod_diff(x: number, y: number, R: number): number;
export declare function pairbit_diff(pairb: number, opairb: number): 0 | 6 | 1 | 2;
export declare function byte_diff(bv: number, obv: number): number;
export declare function h_distance(len: number, x: Uint8Array, y: Uint8Array, tlsh_distance_parameter?: boolean): number;
export declare function swap_byte(input: number): number;
/** Port from tlsh js file. */
export declare function to_hex(src: Uint8Array, len: number): string;
/** Port from tlsh js file */
export declare function from_hex(str: string): Uint8Array;
//# sourceMappingURL=utils.d.ts.map