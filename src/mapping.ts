import { BigInt } from "@graphprotocol/graph-ts"
import {
  GameCore,
  AuditGame,
  ConfigLockTime,
  ConfigMirror,
  ConfigTimeLock,
  ConfigVZOO,
  CreateUser,
  EmergMirrorWithdraw,
  EmergWithdraw,
  EnterTimeLock,
  GameCancel,
  GameEnd,
  GameStart,
  Initialized,
  LockVZOO,
  Pause,
  PaymentInGame,
  RequestRegisterGame,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  UpdateBanned,
  UpdatePlatformFee,
  Withdraw,
  WithdrawFee
} from "../generated/GameCore/GameCore"
import { ExampleEntity } from "../generated/schema"

export function handleAuditGame(event: AuditGame): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity._gamePrimary = event.params._gamePrimary
  entity._enable = event.params._enable

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.DEFAULT_PLATFORM_FEE(...)
  // - contract.OPERATOR_ROLE(...)
  // - contract.banned(...)
  // - contract.gameInfo(...)
  // - contract.gameNonce(...)
  // - contract.gameRoundInfo(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoundId(...)
  // - contract.hasRole(...)
  // - contract.isGame(...)
  // - contract.isGameStartable(...)
  // - contract.lockTime(...)
  // - contract.mirrorBalance(...)
  // - contract.mirrorDelegate(...)
  // - contract.mirrorProxyAdmin(...)
  // - contract.paused(...)
  // - contract.playerInfo(...)
  // - contract.supportsInterface(...)
  // - contract.timeLock(...)
  // - contract.totalFee(...)
  // - contract.userInfo(...)
  // - contract.vZOO(...)
}

export function handleConfigLockTime(event: ConfigLockTime): void {}

export function handleConfigMirror(event: ConfigMirror): void {}

export function handleConfigTimeLock(event: ConfigTimeLock): void {}

export function handleConfigVZOO(event: ConfigVZOO): void {}

export function handleCreateUser(event: CreateUser): void {}

export function handleEmergMirrorWithdraw(event: EmergMirrorWithdraw): void {}

export function handleEmergWithdraw(event: EmergWithdraw): void {}

export function handleEnterTimeLock(event: EnterTimeLock): void {}

export function handleGameCancel(event: GameCancel): void {}

export function handleGameEnd(event: GameEnd): void {}

export function handleGameStart(event: GameStart): void {}

export function handleInitialized(event: Initialized): void {}

export function handleLockVZOO(event: LockVZOO): void {}

export function handlePause(event: Pause): void {}

export function handlePaymentInGame(event: PaymentInGame): void {}

export function handleRequestRegisterGame(event: RequestRegisterGame): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleUpdateBanned(event: UpdateBanned): void {}

export function handleUpdatePlatformFee(event: UpdatePlatformFee): void {}

export function handleWithdraw(event: Withdraw): void {}

export function handleWithdrawFee(event: WithdrawFee): void {}
