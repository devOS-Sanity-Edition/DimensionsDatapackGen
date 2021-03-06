export default {
    "languages": [
        {
            "code": "en",
            "name": "English"
        }
    ],
    "versions": [
        {
            "id": "1.15",
            "refs": {
                "mcdata_master": "13355f7"
            }
        },
        {
            "id": "1.16",
            "refs": {
                "mcdata_master": "1.16.4",
                "vanilla_datapack_data": "1.16.4-data",
                "vanilla_datapack_summary": "1.16.4-summary"
            }
        },
        {
            "id": "1.17",
            "refs": {
                "mcdata_master": "master",
                "vanilla_datapack_data": "data",
                "vanilla_datapack_summary": "summary"
            },
            "dynamic": true
        }
    ],
    "models": [
        {
            "id": "loot-table",
            "name": "Loot Table",
            "path": "loot_tables",
            "schema": "loot_table"
        },
        {
            "id": "predicate",
            "name": "Predicate",
            "path": "predicates",
            "schema": "predicate"
        },
        {
            "id": "item-modifier",
            "name": "Item Modifier",
            "path": "item_modifiers",
            "schema": "item_modifier",
            "minVersion": "1.17"
        },
        {
            "id": "advancement",
            "name": "Advancement",
            "path": "advancements",
            "schema": "advancement"
        },
        {
            "id": "dimension",
            "name": "Dimension",
            "path": "dimension",
            "schema": "dimension",
            "minVersion": "1.16"
        },
        {
            "id": "dimension-type",
            "name": "Dimension Type",
            "path": "dimension_type",
            "schema": "dimension_type",
            "minVersion": "1.16"
        },
        {
            "id": "world",
            "name": "World Settings",
            "schema": "world_settings",
            "minVersion": "1.16"
        },
        {
            "id": "worldgen",
            "name": "Worldgen",
            "category": true,
            "minVersion": "1.16"
        },
        {
            "id": "worldgen/biome",
            "name": "Biome",
            "path": "worldgen/biome",
            "category": "worldgen",
            "schema": "biome",
            "minVersion": "1.16"
        },
        {
            "id": "worldgen/carver",
            "name": "Carver",
            "path": "worldgen/configured_carver",
            "category": "worldgen",
            "schema": "configured_carver",
            "minVersion": "1.16"
        },
        {
            "id": "worldgen/feature",
            "name": "Feature",
            "path": "worldgen/configured_feature",
            "category": "worldgen",
            "schema": "configured_feature",
            "minVersion": "1.16"
        },
        {
            "id": "worldgen/noise-settings",
            "name": "Noise Settings",
            "path": "worldgen/noise_settings",
            "category": "worldgen",
            "schema": "noise_settings",
            "minVersion": "1.16"
        },
        {
            "id": "worldgen/structure-feature",
            "name": "Structure Feature",
            "path": "worldgen/configured_structure_feature",
            "category": "worldgen",
            "schema": "configured_structure_feature",
            "minVersion": "1.16"
        },
        {
            "id": "worldgen/surface-builder",
            "name": "Surface Builder",
            "path": "worldgen/configured_surface_builder",
            "category": "worldgen",
            "schema": "configured_surface_builder",
            "minVersion": "1.16"
        },
        {
            "id": "worldgen/processor-list",
            "name": "Processor List",
            "path": "worldgen/processor_list",
            "category": "worldgen",
            "schema": "processor_list",
            "minVersion": "1.16"
        },
        {
            "id": "worldgen/template-pool",
            "name": "Template Pool",
            "path": "worldgen/template_pool",
            "category": "worldgen",
            "schema": "template_pool",
            "minVersion": "1.16"
        }
    ],
    "registries": [
        { "id": "advancement", "dynamic": true },
        { "id": "attribute", "minVersion": "1.16" },
        { "id": "block" },
        { "id": "dimension", "dynamic": true },
        { "id": "dimension_type", "dynamic": true },
        { "id": "enchantment" },
        { "id": "entity_type" },
        { "id": "fluid" },
        { "id": "function", "dynamic": true },
        { "id": "item" },
        { "id": "loot_condition_type", "minVersion": "1.16" },
        { "id": "loot_function_type", "minVersion": "1.16" },
        { "id": "loot_nbt_provider_type", "minVersion": "1.17" },
        { "id": "loot_number_provider_type", "minVersion": "1.17" },
        { "id": "loot_pool_entry_type", "minVersion": "1.16" },
        { "id": "loot_score_provider_type", "minVersion": "1.17" },
        { "id": "loot_table", "dynamic": true },
        { "id": "mob_effect" },
        { "id": "pos_rule_test", "minVersion": "1.16" },
        { "id": "potion", "minVersion": "1.15" },
        { "id": "predicate", "dynamic": true },
        { "id": "recipe", "dynamic": true },
        { "id": "rule_test", "minVersion": "1.16" },
        { "id": "sound_event" },
        { "id": "stat_type" },
        { "id": "structure", "dynamic": true },
        { "id": "tag/block", "dynamic": true },
        { "id": "tag/entity_type", "dynamic": true },
        { "id": "tag/fluid", "dynamic": true },
        { "id": "tag/function", "dynamic": true },
        { "id": "tag/item", "dynamic": true },
        { "id": "worldgen/biome", "dynamic": true },
        { "id": "worldgen/block_state_provider_type", "minVersion": "1.16" },
        { "id": "worldgen/block_placer_type", "minVersion": "1.16" },
        { "id": "worldgen/biome_source", "minVersion": "1.16" },
        { "id": "worldgen/carver", "minVersion": "1.16" },
        { "id": "worldgen/chunk_generator", "minVersion": "1.16" },
        { "id": "worldgen/configured_carver", "minVersion": "1.16" , "dynamic": true },
        { "id": "worldgen/configured_decorator", "minVersion": "1.16" , "dynamic": true },
        { "id": "worldgen/configured_feature", "minVersion": "1.16" , "dynamic": true },
        { "id": "worldgen/configured_structure_feature", "minVersion": "1.16" , "dynamic": true },
        { "id": "worldgen/configured_surface_builder", "minVersion": "1.16" , "dynamic": true },
        { "id": "worldgen/decorator", "minVersion": "1.16" },
        { "id": "worldgen/feature", "minVersion": "1.16" },
        { "id": "worldgen/feature_size_type", "minVersion": "1.16" },
        { "id": "worldgen/foliage_placer_type", "minVersion": "1.16" },
        { "id": "worldgen/noise_settings", "minVersion": "1.16" , "dynamic": true },
        { "id": "worldgen/processor_list", "minVersion": "1.16" , "dynamic": true },
        { "id": "worldgen/structure_feature", "minVersion": "1.16" },
        { "id": "worldgen/structure_pool_element", "minVersion": "1.16" },
        { "id": "worldgen/structure_processor", "minVersion": "1.16" },
        { "id": "worldgen/surface_builder", "minVersion": "1.16" },
        { "id": "worldgen/template_pool", "minVersion": "1.16" , "dynamic": true },
        { "id": "worldgen/tree_decorator_type", "minVersion": "1.16" },
        { "id": "worldgen/trunk_placer_type", "minVersion": "1.16" },
        { "id": "biome", "maxVersion": "1.15" },
        { "id": "worldgen/biome", "minVersion": "1.16", "path": "processed/reports/biomes" }
    ]
}