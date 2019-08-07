export const EASY_FS_ACTIONS = {
  OPEN_DB_CHANNEL: 'openDBChannel',
  CLOSE_DB_CHANNEL: 'closeDBChannel',
  FETCH_AND_ADD: 'fetchAndAdd',
  FETCH: 'fetch',
  FETCH_BY_ID: 'fetchById',
  DUPLICATE: 'duplicate',
  DELETE: 'delete',
  PATCH: 'patch',
  SET: 'set',
  INSERT: 'insert',
  SET_USER_ID: 'setUserId',

  // Batch Operations
  DELETE_BATCH: 'deleteBatch',
  PATCH_BATCH: 'patchBatch',
  INSERT_BATCH: 'insertBatch',
  DUPLICATE_BATCH: 'duplicateBatch',
  BATCH_SYNC: 'batchSync',
};

export default EASY_FS_ACTIONS;
