import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import useWeaponDialogStyles from "./WeaponDialog.styles";
import SimpleSelect from "components/simple-select/SimpleSelect";
import WeaponEnum from "data/types/WeaponEnum";
import SimpleSelectItem from "data/types/SimpleSelectItem";

interface WeaponDialogProps {
  open: boolean;
  fullScreen: boolean;
  onClose: () => void;
  onEdit: boolean;
}

const WeaponDialog: React.FC<WeaponDialogProps> = (
  props: WeaponDialogProps
) => {
  const { open, onClose, fullScreen, onEdit } = props;
  const [weapon, setWeapon] = useState<WeaponEnum>();
  const styles = useWeaponDialogStyles();
  const weaponData: SimpleSelectItem[] = []; //TODO

  const onChangeWeapon = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      console.log("change weapon", event.target.value);
    },
    []
  );

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={() => onClose()}>
      <DialogContent>
        <DialogTitle className={styles.dialogTitle}>
          <Typography>Scegli l'arma</Typography>
          <IconButton className={styles.closeDialog} onClick={() => onClose()}>
            <Close />
          </IconButton>
        </DialogTitle>
        <SimpleSelect<WeaponEnum>
          label={"Arma"}
          item={weapon}
          data={weaponData}
          onEdit={onEdit}
          onChange={onChangeWeapon}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WeaponDialog;
