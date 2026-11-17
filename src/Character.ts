import type { Weapon } from "./Weapon";

export abstract class Character {
    public readonly name: string;
    public readonly maxHealth: number;
    public readonly baseAttack: number;
    public readonly baseDefense: number;
    private _health: number;
    private _weapon: Weapon | null;

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number){
        this.name = name;
        if(health <= 0){
            throw new Error(`The health of ${name} must be strictly positive.`);
        }
        else {
            this.maxHealth = health;
            this._health = health;
        }
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
    }

    public get health(): number {
        return this._health;
    }

    public abstract getAttack(): number;

    public canEquip(weapon: Weapon): boolean {
        if(weapon){
            return true
        }
        return false
    }

    public equip(weapon: Weapon):void {
        if(this.canEquip(weapon)){
            this._weapon = weapon
        }
        else {
            throw new Error(`${this.name} cannot equip ${weapon.name}.`);
        }
    }

    public describe(): string {
        return `${this.name} - health ${this.health}/${this.maxHealth} - attack ${(this._weapon != null)?(this.baseAttack + this.getWeaponAttackBonus()):(this.baseAttack)} - defense ${this.baseDefense} - weapon: ${(this._weapon != null)?(this._weapon.name):('none')}`
    }

    protected getWeaponAttackBonus():number {
        if(this._weapon != null){
            return this._weapon.attackBonus
        }
        return 0;
    }

    public isAlive(): boolean {
        if(this.health > 0){
            return true
        }
        return false
    }

    public takeDamage(amount: number):void {
        if(amount > this.health){
            this._health = 0
        }
        else {
            this._health -= amount
        }
    }

    public heal(amount: number): void {
        if((this.health + amount) > this.maxHealth){
            this._health = this.maxHealth
        }
        else {
            this._health += amount
        }
    }

    protected computeDamage(target: Character): number{
        if((this._weapon != null) && ((this.baseAttack + this.getWeaponAttackBonus()) > target.baseDefense)){
            return (this.baseAttack + this.getWeaponAttackBonus() - target.baseDefense)
        }
        else if(this.baseAttack > target.baseDefense) {
            return (this.baseAttack - target.baseDefense)
        }
        else {
            return 0
        }
    }

    public attack(target: Character): number{
        if(!this.isAlive()){
            throw new Error(`${this.name} is KO and cannot attack.`);
        }
        else if(this === target){
            throw new Error(`${this.name} cannot attack themselves.`);
        }
        else if(!target.isAlive()){
            throw new Error(`${target.name} is already KO.`);
        }
        target.takeDamage(this.computeDamage(target))
        console.log(`${this.name} hits ${target.name} for ${this.computeDamage(target)} damage (${target.name}: ${target.health}/${target.maxHealth}).`)
        
        if(target.health === 0){
            console.log(`${target.name} is KO!`)
        }
        return this.computeDamage(target)
    }
}