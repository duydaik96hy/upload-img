import * as crypto from "crypto";

export const passPepper: string = process?.env?.passPepper ?? "finest-duy-chilli-pepper";
export const clientKeyPepper: string = process?.env?.clientKeyPepper ?? "duy";

/**
 * Generate salt for password hashing
 */
export const buySalt = (): string => crypto.randomBytes(16).toString("hex");

/**
 * Convert the given pass with the given salt into a hash
 * @param pass
 * @param salt Use buySalt() to generate salt
 */
export const hashPassword = (pass: string, salt: string): string => crypto.pbkdf2Sync(pass, salt + passPepper, 100000, 64, "sha512").toString("hex");

/**
 * Method to generate client Key
 * @param ip
 */
export const hashIP = (ip: string): string => crypto.pbkdf2Sync(ip, clientKeyPepper, 100000, 64, "sha512").toString("hex");
