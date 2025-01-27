import { defineAbilityFor, projectSchema } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' })

const project = projectSchema.parse({ id: 'project-id', ownerId: 'user-id' })

console.log(ability.can('get', 'Billing')) // should be false
console.log(ability.can('create', 'Invite')) // should be false
console.log(ability.can('delete', project)) // should be true if member id = project ownerId
