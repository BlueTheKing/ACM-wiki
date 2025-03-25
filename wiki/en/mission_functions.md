---
title: Mission Functions
permalink: /en/mission_functions
published: true
---

{% include git-wiki/components/toc/toc-include.html %}

# Evacuation Addon Setup

The Evacuation addon allows player casualties to be converted into AI ones, the players are then able to reinforce at a pre-defined location and the casualty evacuated at a later point.
<br><br>
This reinforce point needs to be defined to set where the players will be teleported to after conversion, this should be at a pre-established friendly position, preferably close to a transport method the players will use to get back.

The evacuation object needs to be defined to allow the casualty to be evacuated and to return the used casualty ticket, this should be at a pre-established friendly position, potentially inside a medical building.
<br><br>
Additionally if use of respawn tickets is desired (recommended), respawn ticket subtraction needs to be enabled in the mission attributes.

### Defining evacuation object and reinforcement area
{:.no_toc}
#### Evacuation Object
{:.no_toc}
- Create a new object and enter this code into its init field:<br>
`[this] call ACM_evacuation_fnc_defineEvacuationPoint`
  - Where `this` is the interaction object
- This object will have the required ACE actions to fully evacuate a casualty.
- This object should be made indestructible to avoid issues.

<img src="{{ '/wiki/image/mission_evacpoint.png' | relative_url }}" height="750">

#### Reinforce Point
{:.no_toc}
- Create a new object and enter this code into its init field:<br>
`[this] call ACM_evacuation_fnc_defineReinforcePoint`<br>
  - Where `this` is the reference object
- This object will be used as a reference for where reinforcing players should teleport to, only one of these will be active at a time (last one initialized).
- This object should be made indestructible to avoid issues, it can also be hidden if required.

<img src="{{ '/wiki/image/mission_reinforcepoint.png' | relative_url }}" height="750">

### Enabling respawn ticket subtraction in mission file
{:.no_toc}
Enable ticket subtraction upon unit death, this will make player and converted casualty deaths in the player faction consume respawn tickets.

<img src="{{ '/wiki/image/mission_subtract_tickets.png' | relative_url }}" height="150">

# Casualty Spawner
The casualty spawner allows easily adding a way to spawn casualties with varying severity for training purposes.
<br><br>
The reference object needs to be created to set where the casualties will be spawned.

The training computer object needs to be created to allow the player to spawn casualties at the set severity.

### Reference Object
{:.no_toc}
- Create a new object and set its variable name to something unique (eg. `ACM_mission_TrainingSpot1`).
  - This variable will be used in the training computer object to reference this one.
- This object will be used as a reference where the casualties should spawn, it can be hidden if required.

<img src="{{ '/wiki/image/mission_training_computer_ref.png' | relative_url }}" height="750">

### Training Computer
{:.no_toc}
- Create a new object and enter this code into its init field:<br>
`[this, variable] call ACM_mission_fnc_initTrainingComputer`
  - Where `this` is the interaction object, and `variable` is the variable name of the reference object (eg. `ACM_mission_TrainingSpot1`).
- This object will have all the ACE interactions for spawning, healing and clearing casualties.

<img src="{{ '/wiki/image/mission_trainingcomputer.png' | relative_url }}" height="750">

# Full-Heal Tent
The full-heal tent allows easily adding an object that can fully heal select or all units inside it.
<br><br>
The (tent) object itself needs to be created to define the area inside which units can be healed.

### Tent Object
{:.no_toc}
- Create a new object and enter this code into its its init field:<br>
`[this] call ACM_mission_fnc_initHealTent`
  - Where `this` is the tent object.
- This object will have the ace interactions for fully healing units.
- The ACE interactions allow healing specific units or everyone inside the tent at the same time.

<img src="{{ '/wiki/image/mission_healtent.png' | relative_url }}" height="750">
<br><br>
In a larger objects like the tent the ACE interaction will be floating inside in the center of the object.

<img src="{{ '/wiki/image/mission_healtent_use.png' | relative_url }}" height="500">

# Custom Blood Type List
The custom blood type list allows overwriting SteamID-based blood types, and setting specific blood types for each player, for example based on the player's real blood type.
<br><br>
A function needs to be entered into the mission init field which will define the set blood types of select SteamIDs.

### Enabling custom blood type list in circulation settings
{:.no_toc}
<img src="{{ '/wiki/image/mission_custom_bloodlist_enable.png' | relative_url }}" height="50">

### Defining Blood Types
{:.no_toc}

- Enter this code into the init field in the mission attributes:<br>
  - `[[["<STEAMID>",<ID>]]] call ACM_mission_fnc_createCustomBloodTypeList;`
- This will bind the desired blood type to the set SteamID(s).

<table style = "width:8%;">
    <tr>
        <th>Blood Type</th>
        <th>ID</th>
    </tr>
    <tr>
        <td>O+</td>
        <td>0</td>
    </tr>
    <tr>
        <td>O-</td>
        <td>1</td>
    </tr>
    <tr>
        <td>A+</td>
        <td>2</td>
    </tr>
    <tr>
        <td>A-</td>
        <td>3</td>
    </tr>
    <tr>
        <td>B+</td>
        <td>4</td>
    </tr>
    <tr>
        <td>B-</td>
        <td>5</td>
    </tr>
    <tr>
        <td>AB+</td>
        <td>6</td>
    </tr>
    <tr>
        <td>AB-</td>
        <td>7</td>
    </tr>
</table>

#### Example:
{:.no_toc}
`[[["76561197960287930",1],["76561195961284930",4]]] call ACM_mission_fnc_createCustomBloodTypeList;`<br>
- **76561197960287930** will have blood type **O-**, and **76561195961284930** will have blood type **B+**.

<img src="{{ '/wiki/image/mission_custombloodlist.png' | relative_url }}" height="400">