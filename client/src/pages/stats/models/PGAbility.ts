import AbilitiesEnum from "data/types/AbilitiesEnum";

interface PGAbility{
    type: AbilitiesEnum,
    points: number,
    hasProficiency: boolean
}
export default PGAbility