/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { createMember, InvalidMemberError } from './createMember' 

describe('createMember', () => {
  it('creates a member to be added to the guild', () => {
    const memberToBeAdded = createMember('abc', 'Ilona', 5, 'Idle')
    expect(memberToBeAdded.guildId).toBe('abc');
    expect(memberToBeAdded.name).toBe('Ilona');
  })

  it('throws on invalid member name', () => {
    expect(() => createMember('abc', '  ', 5)).toThrow(InvalidMemberError);
    expect(() => createMember('abc', 'A very long member name that exceeds twenty-five characters', 5)).toThrow(InvalidMemberError);
  })

  it('throws on invalid upkeep cost', () => {
    expect(() => createMember('abc', 'Ilona', -1)).toThrow(InvalidMemberError);
    expect(() => createMember('abc', 'Ilona', 2.5)).toThrow(InvalidMemberError);
  })
  it('throws on invalid status', () => {
    expect(() => createMember('abc', 'Ilona', 5, 'Busy' as any)).toThrow(InvalidMemberError);
  })
})

    
  

