# Hunger & Practical Snacking Plan: May 2026

## Patient Context

Deepak Bansal has uncontrolled type 2 diabetes history (**HbA1c 12.7%**), recent fasting sugar improvement but still elevated readings, active **Huminsulin + Daparyl M**, suspected/managed pancreatic enzyme issue with **Panlipase 10000**, Grade-2 fatty liver, high cardiovascular risk, and chain smoking. Because of this, "hungry all the time" should not be treated as a simple appetite problem.

This page links to [[Diet-Research-Summer-2026]], [[Medication-Research-May-2026]], and [[Liver-Prostate-Care-May-2026]].

## Current Web-Checked Basis

- **CDC Diabetes Meal Planning**: regular balanced meals, fewer added sugars/refined grains, more non-starchy vegetables, and protein/fiber/fat with carbs to slow glucose rise. Portion control matters.
- **CDC Low Blood Sugar / Hypoglycemia**: hunger can be a low-sugar symptom; glucose below 70 mg/dL needs fast-acting carbohydrate treatment, not slow high-fiber snacks.
- **NIDDK Pancreatitis/EPI nutrition**: small frequent meals, low-fat eating, fluids, caffeine limitation, no alcohol, quitting smoking, and PERT with meals/snacks are key safety principles.
- **FDA SGLT2 warning**: dapagliflozin-class medicines can rarely cause ketoacidosis symptoms such as nausea, vomiting, abdominal pain, unusual tiredness, or breathing difficulty, sometimes without very high glucose.

Sources used: CDC Diabetes Meal Planning, CDC Low Blood Sugar/Hypoglycemia, NIDDK EPI Eating/Diet/Nutrition, NIDDK Pancreatitis Eating/Diet/Nutrition, FDA SGLT2 inhibitor safety.

## First Rule: Hunger Needs a Glucose Check

| Situation | Meaning | Action |
|---|---|---|
| Sudden hunger with shaking, sweating, weakness, confusion, fast heartbeat, or anxiety | Possible hypoglycemia, especially after insulin, walking, delayed meal, or smaller meal | Check glucose immediately. If below 70 mg/dL, use the doctor's low-sugar plan / 15g fast-carb rule. Do not use chana, makhana, nuts, soup, or paneer as rescue food because they work too slowly. |
| Hunger with high sugar, thirst, dry mouth, frequent urination, tiredness | Possible ongoing hyperglycemia/dehydration | Give water, avoid extra carbs, and review diabetes plan. If sick, vomiting, poor intake, abdominal pain, unusual tiredness, or breathing trouble occurs on Daparyl M, ask doctor about ketones. |
| Normal reading and steady symptoms | True appetite or habit/craving | Give one measured protein + fiber mini-snack. Wait 20 minutes before repeating. |

## Practical Snack Rules

1. **One portion only**: "Healthy" snacks still add calories and can worsen fatty liver if repeated.
2. **Protein + fiber first**: chana, moong, sattu, dahi/chaach, small paneer/egg, and vegetables are better than fruit-only or roti-only snacks.
3. **Low oil for pancreas/liver**: avoid fried, buttery, creamy, or ghee-heavy snacks.
4. **Panlipase question**: if the snack contains meaningful calories, protein, or fat, ask the doctor whether Panlipase is also needed with snacks, not only meals.
5. **No snack substitutions for smoking**: do not replace cigarettes with biscuits, namkeen, sweets, juice, or extra tea.

## Allopathic Snack Shortlist

| Snack | Portion | Best Use | Notes |
|---|---|---|---|
| Cucumber + bhuna chana | 1 cup cucumber + 25-30g chana | Default hunger snack | Good protein/fiber; reduce chana if gas increases. |
| Roasted makhana | 1.5-2 cups dry roasted | Crunchy tea-time replacement | No fried masala; max 1/2 tsp ghee for full batch. |
| Sugar-free sattu jeera drink | Start 1 tbsp; max 2 tbsp in water | Summer afternoon hunger | No jaggery. Counts as food, not free water. |
| Steamed moong sprouts chaat | 1/2 cup | Mid-morning/evening | Steam if raw sprouts cause gas. |
| Mini moong dal chilla | 1 small chilla | Strong hunger | Treat as a small meal-like snack; minimal oil. |
| Low-fat dahi/chaach | 1/2 cup dahi or 1 glass thin chaach | Daytime | No sugar; avoid at night if acidity/nocturia. |
| Lauki/tori/tomato soup | 1 bowl | Heavy digestion/evening | No cream, cornflour, bread, or butter. |
| Paneer cucumber plate | 40-50g low-fat paneer | 2-3x/week | Protein-rich but calorie/fat controlled. |
| Boiled egg option | 1 boiled egg or 2 whites | If family eats egg | No fried egg/omelette with bread. |
| Fruit + tiny nuts | 1 small guava/apple or papaya bowl + 4 almonds or 1 walnut | Once daily max | Whole fruit only; no juice, mango, banana, grapes, dates while sugar remains high. |

## Ayurvedic Framing

The snack pattern should be **laghu** (light), **ruksha enough to reduce Kapha/Meda**, and summer-friendly/cooling where possible. This fits a Madhumeha + Yakrit/Meda picture without adding concentrated herbs.

Preferred food-level options:
- **Kheera, lauki, tori, tinda**: cooling, light, hydrating.
- **Moong**: laghu and usually easier than heavier pulses.
- **Bhuna chana and sattu**: filling, dry/kapha-reducing, but start small if gas occurs.
- **Chaach/takra with roasted jeera**: lighter than curd and digestion-supportive in daytime.
- **Saunf/ajwain**: useful after meals for gas tendency.

Avoid in Ayurvedic logic and allopathic logic together: fried snacks, heavy curd at night, sweets/jaggery/honey, maida/bakery, large nuts/dry fruit, excessive dairy, cold drinks, juice, and overeating after cravings.

## Website/Data Updates Made

- Added `hungerCheck` decision cards to `data/diet.json`.
- Added measured `hungerSnacks` with portions, timing, allopathic reasoning, Ayurvedic reasoning, and Panlipase notes.
- Added snack safety rules: portion control, protein+fiber first, Panlipase snack discussion, and avoid-list.
- Updated simple family Q&A for "hungry all the time" and "unlimited healthy snacks."
- Updated `app.js` so Today renders the "Always Hungry Plan"; Food List renders the detailed "Practical Hunger Snacks" table. This avoids showing the same full snack table twice.

## 14 May 2026 Website Audit Cleanup

- Removed the old generic `snacks` block from `data/diet.json` because it duplicated the newer measured `hungerSnacks` table.
- Moved the full practical snack table out of Today and kept it in Food List only.
- Moved Fruits Guide from Safety to Food List because it is food-reference content, not a medication/safety warning.
- Removed Pending Tests from Today because Reports already owns pending-test tracking.
- Narrowed Liver Protocol to clinician-review herbs only; coffee, green tea, and pumpkin seeds now live in food sections instead of repeating under protocol.
