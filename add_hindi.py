import json
import re

with open('data/diet.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

replacements = {
    r'\bSteady Sugar Management\b': 'Steady Sugar Management (रक्त शर्करा/शुगर नियंत्रण)',
    r'\bOptimized Medication\b': 'Optimized Medication (सही दवाएं)',
    r'\bGentle Weight Management\b': 'Gentle Weight Management (वजन नियंत्रण)',
    r'\bCooling Summer Hydration\b': 'Cooling Summer Hydration (गर्मी से बचाव और हाइड्रेशन)',
    r'\bBalanced Nutrition\b': 'Balanced Nutrition (संतुलित आहार)',
    r'\bHealthy Fats\b': 'Healthy Fats (स्वस्थ वसा/चिकनाई)',
    r'\bPancreas Protection\b': 'Pancreas Protection (अग्नाशय/Pancreas का बचाव)',
    r'\bAnti-inflammatory\b': 'Anti-inflammatory (सूजन कम करने वाला)',
    r'\bAntioxidant Shield\b': 'Antioxidant Shield (फ्री रेडिकल्स/नुकसान से बचाव)',
    r'\bCancer Prevention\b': 'Cancer Prevention (कैंसर से बचाव)',
    r'\bCruciferous Veg\b': 'Cruciferous Veg (गोभी वर्गीय सब्जियां)',
    r'\bRasayana Herbs\b': 'Rasayana Herbs (रसायन/आयुर्वेदिक जड़ी-बूटियां)',
    r'\bBeta-cell protector\b': 'Beta-cell protector (इंसुलिन बनाने वाले सेल का बचाव)',
    r'\bVitamin C source\b': 'Vitamin C source (विटामिन सी का स्रोत)',
    r'\bAnti-diabetic\b': 'Anti-diabetic (मधुमेह/शुगर रोधी)',
    r'\banti-cancer\b': 'anti-cancer (कैंसर रोधी)',
    r'\bAnti-cancer\b': 'Anti-cancer (कैंसर रोधी)',
    r'\boxidative stress\b': 'oxidative stress (ऑक्सीडेटिव स्ट्रेस/अंदरूनी टूट-फूट)',
    r'\bOxidative Stress\b': 'Oxidative Stress (ऑक्सीडेटिव स्ट्रेस/अंदरूनी टूट-फूट)',
    r'\binsulin resistance\b': 'insulin resistance (इंसुलिन का काम न कर पाना)',
    r'\bInsulin resistance\b': 'Insulin resistance (इंसुलिन का काम न कर पाना)',
    r'\bfibrosis\b': 'fibrosis (लिवर का सख्त होना)',
    r'\bImmune booster\b': 'Immune booster (रोग प्रतिरोधक क्षमता/इम्यूनिटी बढ़ाने वाला)',
    r'\bProstate\b': 'Prostate (प्रोस्टेट/गदूद)',
    r'\bprostate\b': 'prostate (प्रोस्टेट/गदूद)',
    r'\bEnzyme replacement\b': 'Enzyme replacement (पचाने वाले एंजाइम की कमी पूरी करना)',
    r'\bGlycemic Index\b': 'Glycemic Index (शुगर बढ़ाने की गति)',
    r'\bMetabolism\b': 'Metabolism (पाचन तंत्र/चयापचय)',
    r'\bblood sugar\b': 'blood sugar (ब्लड शुगर/रक्त शर्करा)',
    r'\bBlood sugar\b': 'Blood sugar (ब्लड शुगर/रक्त शर्करा)',
    r'\bFatty liver\b': 'Fatty liver (फैटी लिवर/लिवर में सूजन)',
    r'\bfatty liver\b': 'fatty liver (फैटी लिवर/लिवर में सूजन)',
    r'\bDigestion\b': 'Digestion (पाचन)',
    r'\bdigestion\b': 'digestion (पाचन)',
    r'\bImmunity\b': 'Immunity (रोग प्रतिरोधक क्षमता)',
    r'\bimmunity\b': 'immunity (रोग प्रतिरोधक क्षमता)',
    r'\bToxins\b': 'Toxins (विषाक्त पदार्थ/गंदगी)',
    r'\btoxins\b': 'toxins (विषाक्त पदार्थ/गंदगी)',
    r'\bPortion Control\b': 'Portion Control (मात्रा पर नियंत्रण/कम खाना)',
    r'\bHydration\b': 'Hydration (पानी की कमी पूरी करना)',
    r'\bInsulin sensitivity\b': 'Insulin sensitivity (इंसुलिन का बेहतर काम करना)',
    r'\bKidney damage\b': 'Kidney damage (किडनी का नुकसान)',
    r'\bkney damage\b': 'kidney damage (किडनी का नुकसान)',
    r'\bAntioxidants\b': 'Antioxidants (एंटीऑक्सीडेंट्स/नुकसान से बचाने वाले तत्व)',
    r'\bantioxidants\b': 'antioxidants (एंटीऑक्सीडेंट्स/नुकसान से बचाने वाले तत्व)',
    r'\bCardiovascular\b': 'Cardiovascular (हृदय/दिल से संबंधित)',
    r'\bcardiovascular\b': 'cardiovascular (हृदय/दिल से संबंधित)',
    r'\bHigh blood pressure\b': 'High blood pressure (हाई बीपी)',
    r'\bhypertension\b': 'hypertension (हाई बीपी)'
}

def replace_hindi(text):
    if not isinstance(text, str):
        return text
    for pattern, replacement in replacements.items():
        # Avoid double replacing if it already has hindi
        if " (" not in replacement: continue # safety check not needed based on my dict, but good to have
        
        # Only replace if the hindi isn't already there
        hindi_part = replacement.split('(')[1].strip(')')
        if hindi_part not in text:
            text = re.sub(pattern, replacement, text)
    return text

def process(obj):
    if isinstance(obj, dict):
        return {k: process(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [process(v) for v in obj]
    elif isinstance(obj, str):
        return replace_hindi(obj)
    else:
        return obj

new_data = process(data)

with open('data/diet.json', 'w', encoding='utf-8') as f:
    json.dump(new_data, f, indent=2, ensure_ascii=False)

print("Added Hindi translations to diet.json successfully.")
