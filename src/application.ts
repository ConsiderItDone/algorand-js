export enum OnCompletion {
    // NoOpOC indicates that an application transaction will simply call its ApprovalProgram
    NoOpOC,
    
    // OptInOC indicates that an application transaction will allocate some
    // LocalState for the application in the sender's account
    OptInOC,
    CloseOutOC,
    ClearStateOC,
    UpdateApplicationOC,
    DeleteApplicationOC,
    
}