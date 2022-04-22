import {StackType, StackValue} from "./stack";

export enum TxnField {
    // Sender Transaction.Sender
    Sender,

    // Fee Transaction.Fee
    Fee,

    // FirstValid Transaction.FirstValid
    FirstValid,

    // FirstValidTime panic
    FirstValidTime,

    // LastValid Transaction.LastValid
    LastValid,

    // Note Transaction.Note
    Note,

    // Lease Transaction.Lease
    Lease,

    // Receiver Transaction.Receiver
    Receiver,

    // Amount Transaction.Amount
    Amount,
    
    // CloseRemainderTo Transaction.CloseRemainderTo
    CloseRemainderTo,
    
    // VotePK Transaction.VotePK
    VotePK,

    // SelectionPK Transaction.SelectionPK
    SelectionPK,
    
    // VoteFirst Transaction.VoteFirst
    VoteFirst,
    
    // VoteLast Transaction.VoteLast
    VoteLast,
    
    // VoteKeyDilution Transaction.VoteKeyDilution
    VoteKeyDilution,
    
    // Type Transaction.Type
    Type,
    
    // TypeEnum int(Transaction.Type)
    TypeEnum,
    
    // XferAsset Transaction.XferAsset
    XferAsset,
    
    // AssetAmount Transaction.AssetAmount
    AssetAmount,
    
    // AssetSender Transaction.AssetSender
    AssetSender,
    
    // AssetReceiver Transaction.AssetReceiver
    AssetReceiver,
    
    // AssetCloseTo Transaction.AssetCloseTo
    AssetCloseTo,
// GroupIndex i for txngroup[i] == Txn
    GroupIndex,
// TxID Transaction.ID()
    TxID,
// ApplicationID basics.AppIndex
    ApplicationID,
// OnCompletion OnCompletion
    OnCompletion,
// ApplicationArgs  [][]byte
    ApplicationArgs,
// NumAppArgs len(ApplicationArgs)
    NumAppArgs,
// Accounts []basics.Address
    Accounts,
// NumAccounts len(Accounts)
    NumAccounts,
// ApprovalProgram []byte
    ApprovalProgram,
// ClearStateProgram []byte
    ClearStateProgram,
// RekeyTo basics.Address
    RekeyTo,
// ConfigAsset basics.AssetIndex
    ConfigAsset,
// ConfigAssetTotal AssetParams.Total
    ConfigAssetTotal,
// ConfigAssetDecimals AssetParams.Decimals
    ConfigAssetDecimals,
// ConfigAssetDefaultFrozen AssetParams.AssetDefaultFrozen
    ConfigAssetDefaultFrozen,
// ConfigAssetUnitName AssetParams.UnitName
    ConfigAssetUnitName,
// ConfigAssetName AssetParams.AssetName
    ConfigAssetName,
// ConfigAssetURL AssetParams.URL
    ConfigAssetURL,
// ConfigAssetMetadataHash AssetParams.MetadataHash
    ConfigAssetMetadataHash,
// ConfigAssetManager AssetParams.Manager
    ConfigAssetManager,
// ConfigAssetReserve AssetParams.Reserve

    ConfigAssetReserve,
// ConfigAssetFreeze AssetParams.Freeze
    ConfigAssetFreeze,
// ConfigAssetClawback AssetParams.Clawback
    ConfigAssetClawback,
//FreezeAsset  basics.AssetIndex
    FreezeAsset,
// FreezeAssetAccount basics.Address
    FreezeAssetAccount,
// FreezeAssetFrozen bool
    FreezeAssetFrozen,
// Assets []basics.AssetIndex
    Assets,
// NumAssets len(ForeignAssets)
    NumAssets,
// Applications []basics.AppIndex
    Applications,
// NumApplications len(ForeignApps)
    NumApplications,

// GlobalNumUint uint64
    GlobalNumUint,
// GlobalNumByteSlice uint64
    GlobalNumByteSlice,
// LocalNumUint uint64
    LocalNumUint,
// LocalNumByteSlice uint64
    LocalNumByteSlice,

// ExtraProgramPages AppParams.ExtraProgramPages
    ExtraProgramPages,

    // Nonparticipation Transaction.Nonparticipation
    Nonparticipation,

    // Logs Transaction.ApplyData.EvalDelta.Logs
    Logs,

    // NumLogs len(Logs)
    NumLogs,

    // CreatedAssetID Transaction.ApplyData.EvalDelta.ConfigAsset
    CreatedAssetID,

    // CreatedApplicationID Transaction.ApplyData.EvalDelta.ApplicationID
    CreatedApplicationID,

    // fence for some setup that loops from Sender..invalidTxnField
    invalidTxnField 
}

export type TxnFieldSpec = {
    field: TxnField,
    ftype: StackType,

    // When this field become available to txn/gtxn. 0=always
    version: number,

    // When this field become available to itxn_field. 0=never
    itxVersion: number,

    // Is this a field on the "effects"? That is, something in ApplyData
    effects: boolean,
};

export interface EvalContext {
    stack: StackValue[]
    callstack: number[]
}

export type OpEvalFunc = (ctx: EvalContext) => void;

export type AssembleFunc = (stream, opSpec: OpSpec, fields: string[]) => void;

export interface OpSpec {
    opcode: Buffer;
    name: string;
    op: OpEvalFunc;
    asm: AssembleFunc;
}

// Buffer.alloc(10);