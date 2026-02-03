import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { createMemberFacade } from './createMemberFacade';
import { createMember, InvalidMemberError } from '../createMember';
