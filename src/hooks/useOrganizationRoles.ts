import { useEffect, useState } from "react";
import { roleService } from "../services/roleServices";
import type { AddRoleForm, Role } from "../types/role";

export function useOrganizationRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadRoles() {
      try {
        const loadedRoles = await roleService.getAllRoles();
        if (!ignore) {
          setRoles(loadedRoles);
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error ? error.message : "Unable to load roles.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadRoles();
    return () => {
      ignore = true;
    };
  }, []);

  async function addRole(input: AddRoleForm): Promise<boolean> {
    setError(null);
    try {
      const updatedRole = await roleService.addRole(input);
      setRoles((currentRoles) => {
        const exists = currentRoles.some((role) => role.id === updatedRole.id);
        return exists
          ? currentRoles.map((role) =>
              role.id === updatedRole.id ? updatedRole : role,
            )
          : [...currentRoles, updatedRole];
      });
      return true;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to add role.",
      );
      return false;
    }
  }

  return { roles, loading, error, addRole };
}
