import {processStatusMap, verificationTypeMap} from "../constants/common.const";

export interface BaseItem {
    id: number;
    code?: string;
    name?: string;
    status?: string;
}

export interface ProcessStatus {
    id: number;
    name: keyof typeof processStatusMap;
}

export interface VerificationType {
    id: number;
    name: keyof typeof verificationTypeMap;
}
