import random

# Define lists of Pokémon names and their attacks

# Available Pokémon the computer can choose from
pokemons = (
    "Venusaur",
    "Charizard",
    "Blastoise",
    "Pikachu",
    "Snorlax",
    "Gengar",
    "Dragonite",
    "Alakazam",
    "Machamp",
    "Arcanine"
)

# Your Pokémon team
user_pokemons = (
    "Pikachu",
    "Caterpie",
    "Pidgeotto",
    "Bulbasaur", 
    "Charmander",
    "Squirtle"
)

# Attacks for your Pokémon
user_pokemons_attacks = (
    ("Thunderbolt", "Thunder Shock", "Volt Switch", "Electro Ball"),
    ("String Shot", "Bug Bite", "Silver Wind", "Twineedle"),
    ("Wing Attack", "Gust", "Quick Attack", "Aerial Ace"),
    ("Razor Leaf", "Vine Whip", "Seed Bomb", "Leaf Blade"),
    ("Ember", "Flamethrower", "Fire Blast", "Heat Wave"),
    ("Water Gun", "Bubblebeam", "Hydro Pump", "Surf")
)

# Attacks for the computer's Pokémon
attacks = (
    ("Solar Beam", "Sludge Bomb", "Giga Drain", "Earthquake"),
    ("Flamethrower", "Air Slash", "Dragon Claw", "Earthquake"),
    ("Hydro Pump", "Ice Beam", "Dark Pulse", "Aura Sphere"),
    ("Thunderbolt", "Volt Tackle", "Iron Tail", "Grass Knot"),
    ("Body Slam", "Earthquake", "Crunch", "Rest"),
    ("Shadow Ball", "Sludge Wave", "Focus Blast", "Thunderbolt"),
    ("Outrage", "Hurricane", "Earthquake", "Dragon Dance"),
    ("Psychic", "Focus Blast", "Shadow Ball", "Recover"),
    ("Close Combat", "Dynamic Punch", "Earthquake", "Stone Edge"),
    ("Flare Blitz", "Extreme Speed", "Wild Charge", "Crunch")
)

# Simplified type chart for attack effectiveness
type_chart = {
    "Normal": {"Normal": 1, "Fighting": 1, "Flying": 1, "Poison": 1, "Ground": 1, "Rock": 0.5, "Ghost": 0, "Steel": 0.5, "Fire": 1, "Water": 1, "Grass": 1, "Electric": 1, "Psychic": 1, "Ice": 1, "Dragon": 1, "Dark": 1, "Fairy": 1},
    # Add more types and their effectiveness here
}

# Function to calculate damage (placeholder for now)
def calculate_damage(attacker, defender, attack):
    damage = random.randint(10, 30)  # Random damage for simplicity
    effectiveness = type_chart.get(attack[1], {}).get(defender[1].split("/")[0], 1)
    damage *= effectiveness
    return int(damage)


# Functions to display the game interface

def print_divider():
    print("----------------------------------------------------------------------")

def print_title():
    print("--------------------------------------------------------------")
    print("|                     Welcome to the Pokémon Battle!                   |")
    print("--------------------------------------------------------------")

def print_pokemon1_list():
    print("Choose Your Strongest Partner Pokémon: ")
    for i, pokemon in enumerate(user_pokemons):
        print(f"{i + 1}. {pokemon}")

# Main battle function
def pokemon_battle(pokemon1, attacks1, pokemon2, attacks2):
    print("\n")
    print("-----------------------------------------------")
    print(f"|----- Battle: {pokemon1} vs. {pokemon2}! -----|")
    print("-----------------------------------------------")

    pokemon1_hp = random.randint(0,100)
    pokemon2_hp = random.randint(0,100)

    while pokemon1_hp > 0 and pokemon2_hp > 0:  # Keep battling until one faints
        # Your turn to attack
        print(f"\n{pokemon1}'s Turn! Choose an attack: ")
        for i, attack in enumerate(attacks1):
            print(f"{i + 1}. {attack}")
        print_divider()

        try:
            attack_choice = int(input("Choose your attack: ")) - 1
            if 0 <= attack_choice < len(attacks1):
                attack = attacks1[attack_choice]
                damage = calculate_damage(pokemon1, pokemon2, attack)
                pokemon2_hp -= damage
                print("-------------------------------------------------------------")
                print(f"{pokemon1} used {attack} and dealt {damage} damage!")

                if pokemon2_hp <= 0:
                    print(f"{pokemon2} fainted! {pokemon1} wins!")
                    print("-------------------------------------------------------------")
                    print("You Win The Match!!")
                    print("-------------------------------------------------------------")
                    break  # End the battle
                else:
                    print(f"{pokemon2} has {pokemon2_hp} HP remaining.")
                print("-------------------------------------")

            else:  
                print("Invalid attack choice. Try again.")
                continue
        except ValueError:
            print("Invalid input. Please enter a number.")
            continue
    
        # Opponent's turn
        opponent_attack = random.choice(attacks2)
        damage = random.randint(10, 30)
        pokemon1_hp -= damage
        print("-------------------------------------------------------------")
        print(f"{pokemon2} used {opponent_attack} and dealt {damage} damage!")
        if pokemon1_hp <= 0:
            print(f"{pokemon1} fainted! {pokemon2} wins!")
            print("-------------------------------------------------------------")
            print("You lost the battle!")
            print("-------------------------------------------------------------")
            break  # End the battle
        else:
            print(f"{pokemon1} has {pokemon1_hp} HP remaining.")
        print("-------------------------------------------")

# Main game loop
def main():
    print_title()
    while True:
        print_pokemon1_list()
        try:
            choice = int(input("Enter the number of your chosen Pokémon: ")) - 1
            if 0 <= choice < len(user_pokemons):
                opponent_choice = random.choice([i for i in range(len(pokemons)) if i != choice])  # Exclude your chosen pokemon
                pokemon_battle(
                    user_pokemons[choice], user_pokemons_attacks[choice],
                    pokemons[opponent_choice], attacks[opponent_choice]
                )
                break  # End the loop after one battle
            else:
                print_divider()
                print("Invalid choice. Please choose a number from the list.")
                print_divider()
        except ValueError:
            print("Invalid input. Please enter a number.")

# Start the game if this script is run directly
if __name__ == "__main__":
    main()
