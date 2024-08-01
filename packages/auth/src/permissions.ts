import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    // o admin, por padrão, pode gerenciar tudo
    can('manage', 'all')
    // mas não pode transferir/atualizar a organização (permissoes de negação n pode ter condicionais)
    cannot(['transfer_ownership', 'update'], 'Organization')
    // a n ser que ele seja o dono
    can(['transfer_ownership', 'update'], 'Organization', {
      owner_id: { $eq: user.id },
    })
  },
  MEMBER(user, { can }) {
    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  BILLING(_, { can }) {
    can('manage', 'Billing')
  },
}
