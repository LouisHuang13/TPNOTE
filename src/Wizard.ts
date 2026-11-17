import { Character } from "./Character";
import type { Weapon } from "./Weapon";

export class Wizard extends Character {
    public static readonly SPELL_COST = 10;
    public readonly maxMana: number;
    private _mana: number;

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number, mana: number) {
        super(name, health, baseAttack, baseDefense)
        if((mana >= 0) && (mana <= 50)){
            this.maxMana = mana
            this._mana = mana
        }
        else if(mana < 0){
            throw new Error(`The mana of ${name} cannot be negative.`);
        }
        else {
            throw new Error(`The mana of ${name} must be between 0 and 50.`);
        }
    }

    public get mana():number {
        return this._mana
    }

    public set mana(value: number) {
        if((value > this.maxMana) && (value < 0) && (value > 50)){
            throw new Error(`The mana of ${this.name} must be between 0 and ${this.maxMana}`);
        }
        else {
            this._mana = value
        }
    }

    public canCastSpell():boolean {
        if(this.mana >= Wizard.SPELL_COST){
            return true
        }
        else {
            return false
        }
    }

    public override getAttack(): number {
        if(this.getWeaponAttackBonus() > 0){
            return (this.baseAttack + this.getWeaponAttackBonus())
        }
        else {
            return this.baseAttack
        }
    }

    public override canEquip(weapon: Weapon): boolean {
        if((weapon.name != "staff") || (weapon.name != "dagger")){
            return false
        }
        else {
            return true
        }
    }

    public override describe(): string {
        return `${this.name} - health ${this.health}/${this.maxHealth} - attack ${(this._weapon != null)?(this.baseAttack + this.getWeaponAttackBonus()):(this.baseAttack)} - defense ${this.baseDefense} - weapon: ${(this._weapon != null)?(this._weapon.name):('none')} - mana ${this.mana}/${this.maxMana}`
    }

    public override attack(target: Character): number {
        super.attack(target);

        if(this.canCastSpell()){
            this.heal(Math.floor(this.computeDamage(target)*(0.20)))
            this._mana -= Wizard.SPELL_COST
        }
        return(this.computeDamage(target))
    }
}