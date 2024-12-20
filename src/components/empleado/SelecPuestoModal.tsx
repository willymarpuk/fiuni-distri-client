import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";
import CustomModal from "../global/CustomModal";
import { useDebounce } from "@uidotdev/usehooks";
import { useAuth } from "../../context/auth/useContext";
import { getPuestos } from "../../lib/api/puesto/puesto.service";
import { PuestoDto } from "../../lib/api/puesto/puesto.types";
import { Loader2 } from "lucide-react";

type Props = {
  display: boolean;
  setDisplay: (value: boolean) => void;
  setValue: UseFormSetValue<EmpleadoDto>;
  setSelectedPuesto: (data: string | null) => void;
};

const SelectPuestoModal = ({ display, setDisplay, setValue, setSelectedPuesto }: Props) => {
  const { session } = useAuth();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<PuestoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedQuery = useDebounce(query, 500);

  if (!display) return null;

  const onCloseHanlder = () => setDisplay(false);
  const onSubmitHandler = (id: number, nombre: string) => {
    return () => {
      setSelectedPuesto(nombre);
      setValue("puesto_id", id, { shouldValidate: true });
      setDisplay(false);
    };
  };

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await getPuestos(session!.accessToken, {
        "buscar": debouncedQuery,
      } as any);
      setUsers(data.content);
      setIsLoading(false);
    };
    getUsers();
  }, [debouncedQuery]);

  return (
    <CustomModal
      title="Seleccione un Puesto"
      type="primary"
      onClose={onCloseHanlder}
    >
      <div className="d-flex flex-column gap-4">
        <input
          className="flex-grow-1 form-control"
          placeholder="Buscar por nombre de puesto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="d-flex flex-column gap-2">
          {
          isLoading?
            <Loader2 className="mx-auto spin-animation" />
            :
          users.length > 0 ?
            users.map((puesto) => (
              <button
                className="btn btn-outline-primary btn-sm text-start"
                type="button"
                onClick={onSubmitHandler(puesto.id, puesto.nombre)}
                key={puesto.id}
              >
                {puesto.nombre}
              </button>
            )):
            <p className="text-center text-muted">No se encontraron puestos</p>}
        </div>
      </div>
    </CustomModal>
  );
};

export default SelectPuestoModal;
