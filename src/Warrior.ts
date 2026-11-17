import { Character } from "./Character";
import type { Weapon } from "./Weapon";

export class Warrior extends Character {
    public static readonly RAGE_MULTIPLIER = 1.5;

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number) {
        super(name, health, baseAttack, baseDefense)
    }
    
    public isEnraged():boolean {
        if(this.health >= (this.maxHealth/2)){
            return false
        }
        else {
            return true
        }
    }

    public override getAttack(): number {
        if(this.isEnraged()){
            return (Math.floor((this.baseAttack + this.getWeaponAttackBonus())*Warrior.RAGE_MULTIPLIER))
        }else {
            return (this.baseAttack + this.getWeaponAttackBonus())
        }
    }

    public override canEquip(weapon: Weapon): boolean {
        if(weapon.kind === "staff"){
            return false
        }
        else {
            return true
        }
    }

    public override describe(): string {
        if(this.isEnraged()){
            return `[Warrior] ${this.name} - health ${this.health}/${this.maxHealth} - attack ${(this._weapon != null)?(this.baseAttack + this.getWeaponAttackBonus()):(this.baseAttack)} - defense ${this.baseDefense} - weapon: ${(this._weapon != null)?(this._weapon.name):('none')} - enraged`
        }
        else {
            `${this.name} - health ${this.health}/${this.maxHealth} - attack ${(this._weapon != null)?(this.baseAttack + this.getWeaponAttackBonus()):(this.baseAttack)} - defense ${this.baseDefense} - weapon: ${(this._weapon != null)?(this._weapon.name):('none')}`
        }
    }
}