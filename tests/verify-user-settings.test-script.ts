import { getUserSettings, createUserSettings, updateUserSettings } from '../src/lib/db/user-settings'

async function test() {
  console.log('Testing user-settings imports and basic structure...')
  console.log('getUserSettings type:', typeof getUserSettings)
  console.log('createUserSettings type:', typeof createUserSettings)
  console.log('updateUserSettings type:', typeof updateUserSettings)
}

test().catch(console.error)
