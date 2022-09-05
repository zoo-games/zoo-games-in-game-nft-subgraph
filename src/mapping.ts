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
// import { ExampleEntity } from "../generated/schema"
import { GameStatus, GameRegisterRequest } from "../generated/schema"

export function handleAuditGame(event: AuditGame): void {
  let game = GameRegisterRequest.load(event.params._gamePrimary.toHex());
  if (game) {
    if (event.params._enable) {
      game.status = "AUDITED";
    } else {
      game.status = "REJECTED";
    }
    game.save();
  }
}

export function handleConfigLockTime(event: ConfigLockTime): void {}

export function handleConfigMirror(event: ConfigMirror): void {}

export function handleConfigTimeLock(event: ConfigTimeLock): void {}

export function handleConfigVZOO(event: ConfigVZOO): void {}

export function handleCreateUser(event: CreateUser): void {}

export function handleEmergMirrorWithdraw(event: EmergMirrorWithdraw): void {}

export function handleEmergWithdraw(event: EmergWithdraw): void {}

export function handleEnterTimeLock(event: EnterTimeLock): void {}

export function handleGameCancel(event: GameCancel): void {
  let status = GameStatus.load(event.params._roundId.toHex());
  if (status) {
    status.status = "CANCEL";
    status.save();
  }
}

export function handleGameEnd(event: GameEnd): void {
  let status = GameStatus.load(event.params._roundId.toHex());
  if (status) {
    status.status = "END";
    status.save();
  }
}

export function handleGameStart(event: GameStart): void {
  let status = new GameStatus(event.params._input._roundId.toHex());
  status.status = "STARTED";
  status.roundId = event.params._input._roundId;
  status.gamePrimary = event.params._input._gamePrimary;
  status.timestamp = event.block.timestamp;
  status.save();
}

export function handleInitialized(event: Initialized): void {}

export function handleLockVZOO(event: LockVZOO): void {}

export function handlePause(event: Pause): void {}

export function handlePaymentInGame(event: PaymentInGame): void {}

export function handleRequestRegisterGame(event: RequestRegisterGame): void {
  let game = new GameRegisterRequest(event.transaction.from.toHex());
  game.gamePrimary = event.transaction.from;
  game.gameName = event.params._input.gameName;
  game.gameDescription = event.params._input.gameDescription;
  game.gameImageURL = event.params._input.gameImageURL;
  game.gameCategory = event.params._input.gameCategory;
  game.maxVZOO = event.params._input.maxVZOO;
  game.minTimeCostPerRound = event.params._input.minTimeCostPerRound;
  game.maxPlayerCountPerRound = event.params._input.maxPlayerCountPerRound;
  game.email = event.params._input.email;
  game.informationJsonURL = event.params._input.informationJsonURL;
  game.status = "PENDING";
  game.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleUpdateBanned(event: UpdateBanned): void {}

export function handleUpdatePlatformFee(event: UpdatePlatformFee): void {}

export function handleWithdraw(event: Withdraw): void {}

export function handleWithdrawFee(event: WithdrawFee): void {}
