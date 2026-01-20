import { describe, it, expect } from 'vitest'
import { createMember } from './createMember' 

describe('createMemberForGuild', () => {
  it('creates a member to be added to the guild', () => {
    const memberToBeAdded = createMember('abc', 'Ilona', 5, 'Idle')
    expect(memberToBeAdded.guildId).toBe('abc');
    expect(memberToBeAdded.name).toBe('Ilona');
  })

  it('throws on invalid member name', () => {

  })
})

    
  

