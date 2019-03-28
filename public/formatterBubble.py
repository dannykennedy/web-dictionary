#!/usr/local/bin/python3


import sys, re, json
from operator import itemgetter

if len(sys.argv) < 2:
    print("Usage: " + sys.argv[0] + " file-to-modify")
    sys.exit(1)

myfile = sys.argv[1]


# Preprocess fi: and fv:
preprocesslines = []
with open(myfile,'r') as f:
    for line in f:
        words = line.split(' ')
        newwords = []
        for word in words:
            if re.search(r'fi:([-a-zA-Z_\']+)', word):
                match = re.search(r'fi:([-a-zA-Z_\']+)', word)
                newword = '<i>' + match.group(1) + '</i>'
                newword = re.sub('_', ' ', newword)
                word = re.sub(r'(fi:[-a-zA-Z_\']+)', newword, word)
                newwords.append(word)

            elif re.search(r'fv:([-a-zA-Z_\']+)', word):
                match = re.search(r'fv:([-a-zA-Z_\']+)', word)
                newword = '<b>' + match.group(1) + '</b>'
                newword = re.sub('_', ' ', newword)
                word = re.sub(r'(fv:[-a-zA-Z_\']+)', newword, word)
                print(word)
                newwords.append(word)
            else:
                newwords.append(word)

        line = ' '.join(newwords)
        preprocesslines.append(line)
    f.close()
with open(myfile,'w') as f:
    for line in preprocesslines:
        f.write(line)




lines = []
entries = []

# Set up everything blank
withinSubEntry = "false"
withinSense = "false"
withinExampleSentence = "false"
subEntry = {}
entry = {}
sense = {}
entry["va"] = []
entry["sn"] = []
entry["se"] = []
senseEnglishReverses = []
senseExampleSentences = []
sense["re"] = senseEnglishReverses
sense["ex"] = senseExampleSentences
# exampleSentence = {}

headword = ""
prefix = ""
hasPrefix = "false"

with open(myfile,'r') as f:


    # GO THROUGH FILE ONE LINE AT A TIME
    for line in f:

        # EVERYTHING OUTSIDE SENSE

        # Headword
        if re.search(r'^\\lx\s(.*)', line):

            match = re.search(r'^\\lx\s(.*)', line)
            entry["lx"] = match.group(1)
            headword = match.group(1)

        # Prefix
        if re.search(r'^\\pr\s(.*)', line):

            match = re.search(r'^\\pr\s([a-z]*)', line)
            entry["pr"] = match.group(1)
            prefix = match.group(1)
            hasPrefix = "true"
            # print(hasPrefix)

        if hasPrefix == "true":
            headword_full = prefix + headword
            entry["full-headword"] = headword_full
            entry["sorting-headword"] = headword_full.lower()
        else:
            entry["full-headword"] = headword
            sort_headword = re.sub(r'\-', '', headword)
            sort_headword = sort_headword.lower()
            entry["sorting-headword"] = sort_headword


        # Variants
        if re.search(r'^\\va\s(.*)', line):

            match = re.search(r'^\\va\s(.*)', line)

            # Add prefix to variants as well. TODO: this no work
            if hasPrefix == "true":
                print("gotta prefix" + entry["full-headword"])
                entry["va"].append(match.group(1))
            else:
                entry["va"].append(match.group(1))

        # Part of speech
        if re.search(r'^\\ps\s(.*)', line):

            match = re.search(r'^\\ps\s(.*)', line)
            entry["ps"] = (match.group(1))

        # Dialect of entry
        if re.search(r'^\\uv\s(.*)', line):

            match = re.search(r'^\\uv\s(.*)', line)
            uv = (match.group(1))
            uv = uv.replace('W', 'Kunwinjku')
            uv = uv.replace('I', 'Kuninjku')
            uv = uv.replace('Djnj', 'Kundedjnjenghmi')
            uv = uv.replace('E', 'Kune')
            uv = uv.replace('Kdj', 'Kundjeyhmi')
            entry["uv"] = uv

        # Alternative dialects
        if re.search(r'^\\ur\s(.*)', line):

            match = re.search(r'^\\ur\s(.*)', line)
            ur = (match.group(1))
            ur = re.sub(r'E(\s)*=', 'Kune =', ur)
            # print(match.group(1))
            ur = re.sub(r'I(\s)*=', 'Kuninjku =', ur)
            ur = re.sub(r'W(\s)*=', 'Kunwinjku =', ur)
            ur = re.sub(r'Djnj(\s)*=', 'Kundedjnjenghmi =', ur)
            ur = re.sub(r'Kdj(\s)*=', 'Kundjeyhmi =', ur)

            ur = re.sub(r'I,', 'Kuninjku,', ur)
            ur = re.sub(r'E,', 'Kune,', ur)
            ur = re.sub(r'Djnj,', 'Kundedjnjenghmi,', ur)
            ur = re.sub(r'Kdj,', 'Kundjeyhmi,', ur)
            ur = re.sub(r'W,', 'Kunwinjku,', ur)

            # Now put tags around things
            # Not ideal but easier to do it this way
            if re.search(r'=\s?([^\,\.]*)', ur):
                match = re.search(r'=\s?([^\,\.]*)', ur)
                for m in match.groups():
                    html = '<span class="ur">'+m+'</span>'
                    ur = ur.replace(m, html)
                    print(m)

                # print(match.group(1))



            entry["ur"] = ur

        # Grammatical notes
        if re.search(r'^\\ng\s(.*)', line):
            match = re.search(r'^\\ng\s(.*)', line)
            entry["ng"] = (match.group(1))

        # Borrowed words
        if re.search(r'^\\bw\s(.*)', line):
            match = re.search(r'^\\bw\s(.*)', line)
            entry["bw"] = (match.group(1))

        # Kunbalak
        if re.search(r'^\\pdn\s(.*)', line):
            match = re.search(r'^\\pdn\s(.*)', line)
            pdn = match.group(1)
            pdn = re.sub(r'kk(\s)*=(\s)*', '', pdn)
            entry["pdn"] = pdn

        # See also
        if re.search(r'^\\cf\s(.*)', line):
            match = re.search(r'^\\cf\s(.*)', line)
            entry["cf"] = (match.group(1))

        # Second or third sub-entry. Reset sub-entry
        if re.search(r'^\\se\s(.*)', line) and withinSubEntry == "true":
            withinSubEntry = "false"
            subEntry = {}

        # Sub-entry
        if re.search(r'^\\se\s(.*)', line) and withinSubEntry == "false":
            withinSubEntry = "true"
            match = re.search(r'^\\se\s(.*)', line)
            subEntry['lx'] = (match.group(1))
            entry['se'].append(subEntry)

        # Sub-entry English reverse
        # For now we'll assume there's only one of these
        if re.search(r'^\\re\s(.*)', line) and withinSubEntry == "true":

            match = re.search(r'^\\re\s(.*)', line)
            subEntry["re"] = (match.group(1))

        # Sub-entry definition
        if re.search(r'^\\de\s(.*)', line) and withinSubEntry == "true":

            match = re.search(r'^\\de\s(.*)', line)
            subEntry["de"] = (match.group(1))


        # EVERYTHING INSIDE SENSE

        # Second or third sense. Reset sense.
        if re.search(r'^\\sn\s(.*)', line) and withinSense == "true":
            withinSense = "false"
            sense = {}
            senseEnglishReverses = []
            senseExampleSentences = []
            sense["re"] = senseEnglishReverses
            sense["ex"] = senseExampleSentences
            exampleSentence = {}

        if re.search(r'^\\sn\s(.*)', line):
            withinSense = "true"
            match = re.search(r'^\\sn\s(.*)', line)
            sense['no'] = (match.group(1))
            entry['sn'].append(sense)

        # English reverse of sense
        if re.search(r'^\\re\s(.*)', line) and withinSense == "true" and withinSubEntry == 'false':
            match = re.search(r'^\\re\s(.*)', line)
            sense["re"].append(match.group(1))

        # In this case, the word has only a single sense
        if re.search(r'^\\re\s(.*)', line) and withinSense == "false":
            match = re.search(r'^\\re\s(.*)', line)
            withinSense = "true"
            sense['no'] = "1"
            sense["re"].append(match.group(1))
            # print(match.group(1))
            entry['sn'].append(sense)


        # Definition of sense
        if re.search(r'^\\de\s(.*)', line) and withinSense == "true" and withinSubEntry == 'false':
            match = re.search(r'^\\de\s(.*)', line)
            sense["de"] = match.group(1)

        # Scientific word for sense
        if re.search(r'^\\sc\s(.*)', line) and withinSense == "true" and withinSubEntry == 'false':
            match = re.search(r'^\\sc\s(.*)', line)
            sense["sc"] = match.group(1)

        # # Category for sense
        # if re.search(r'^\\sd\s(.*)', line) and withinSense == "true" and withinSubEntry == 'false':
        #     match = re.search(r'^\\sd\s(.*)', line)
        #     sense["sd"] = match.group(1)

        # Synonym for sense
        if re.search(r'^\\sy\s(.*)', line) and withinSense == "true" and withinSubEntry == 'false':
            match = re.search(r'^\\sy\s(.*)', line)
            sense["sy"] = match.group(1)


        withinExampleSentence = "false"

        if re.search(r'^\\xv\s(.*)', line) and withinExampleSentence == "true":
            withinExampleSentence = "false"
            exampleSentence = {}

        # xv for exampleSentence
        if re.search(r'^\\xv\s(.*)', line) and withinSense == "true" and withinSubEntry == 'false' and withinExampleSentence == "false":
            withinExampleSentence = "true"
            exampleSentence = {}
            sense["ex"].append(exampleSentence)
            match = re.search(r'^\\xv\s(.*)', line)
            exampleSentence["xv"] = match.group(1)

        # xe for exampleSentence
        if re.search(r'^\\xe\s(.*)', line):
            match = re.search(r'^\\xe\s(.*)', line)
            exampleSentence["xe"] = match.group(1)

        # so for exampleSentence
        if re.search(r'^\\so\s(.*)', line):
            match = re.search(r'^\\so\s(.*)', line)
            exampleSentence["so"] = match.group(1)



        # End of the entry. Reset everything
        if re.search(r'^\s$', line):

            # Reset everything
            withinSubEntry = "false"
            withinSense = "false"
            subEntry = {}
            entry = {}
            sense = {}
            entry["va"] = []
            entry["sn"] = []
            entry["se"] = []

            #Reset sense
            senseEnglishReverses = []
            senseExampleSentences = []
            sense["re"] = senseEnglishReverses
            sense["ex"] = senseExampleSentences
            exampleSentence = {}

            #Reset prefix
            headword = ""
            prefix = ""
            hasPrefix = "false"

            # Append entry
            entries.append(entry)


# ADD CSS HEADER TO FILE
with open("web-header-bubble.html") as f:
    with open("index.html", "w") as f1:
        for line in f:
            f1.write(line)
    f1.close()
f.close()

# Copy non-offending entries into a new file
clean_entries = []
for entry in entries:
    if 'sorting-headword' in entry:
        clean_entries.append(entry)


# # Sort by headword with prefix
sorted_entries = sorted(clean_entries, key=itemgetter('sorting-headword'))


with open("index.html", 'a') as f:


    f.write('<div class="entry-list-wrapper">')


    # print("all entries " + str(i - 1))

    k = 0;

    for entry in sorted_entries:

        #first entries seems to be blank
        if k==0:
            k = k + 1
            continue
        k = k+1
        if k == 50:
            print('end')
            # break

        # Semantic tag for each entry
        f.write('<article>')

        # Headword/POS section
        f.write('<button class="collapsible">') # collapsible section
        f.write('<div class="header">')
        f.write('<p class="headword"><span class="lx">')

        if 'full-headword' in entry:
            f.write(entry["full-headword"])

        f.write('</span><span class="ps">')

        if 'ps' in entry:
            f.write(entry["ps"])

        f.write('</span></p>')

        if 'va' in entry:

            # If there are actually variations
            if not len(entry["va"]) == 0:

                f.write('<p class="variant"><span class="also">also: </span>')
                i = 0
                while i < len(entry["va"]):
                    f.write('<span class="va">' + entry["va"][i] + '</span>')
                    if not i == len(entry["va"])-1:
                        f.write(", ")
                    i=i+1

                f.write('</p>')

        if 'sn' in entry:
            f.write('<p class="reverses">')
            senseNum = 1
            for sense in entry['sn']:
                # Only write sense numbers if there's more than one sense
                if len(entry['sn']) > 1:
                    f.write(str(senseNum))
                    f.write(". ")
                    senseNum = senseNum + 1

                # Write the reversals
                if 're' in sense:
                    reverseNum = 0
                    for reverse in sense['re']:
                        reverseNum = reverseNum + 1
                        f.write('<span class="re">' + reverse + '</span>')
                        # Only write a comma if it's not the last reverse in the sense
                        if not reverseNum == len(sense['re']):
                            f.write(", ")
                        else:
                            f.write(" ")
            f.write("</p>")

        if 'ur' in entry:
            f.write('<p class="usage-regional subentry-text end"><span class="se-info end">Other languages</span><span>')
            f.write(entry["ur"])
            f.write('</span></p>')


        # End of headword/POS section
        f.write('</div>')
        f.write('</button>') #end of collapsible

        # DEFINITION SECTION

        f.write('<div class="content">') #inside of collapsible

        if 'sn' in entry:
            for sense in entry['sn']:

                # DEFINITION
                f.write('<p class="de-box">')
                if 'no' in sense:
                    if len(entry["sn"]) > 1:
                        f.write('<span class="sn">' + sense["no"] + '</span>')
                f.write('<span class="de">')
                if 'de' in sense:
                    f.write(sense["de"])
                f.write('</span></p>')

                # SYNONYMS
                if 'sy' in sense:
                    f.write('<p class="sy subentry-text"><span class="se-info">Synonyms</span><span>')
                    f.write(sense["sy"])
                    f.write('</span></p>')

                # SCIENTIFIC
                if 'sc' in sense:
                    f.write('<p class="sc subentry-text"><span class="se-info">Scientific name</span><span>')
                    f.write(sense["sc"])
                    f.write('</span></p>')

                # # SEMANTIC DOMAIN
                # if 'sd' in sense:
                #     f.write('<p class="sd subentry-text"><span class="se-info">Category</span><span>')
                #     f.write(sense["sd"])
                #     f.write('</span></p>')

                # # KUNBALAK
                # if 'pdn' in sense:
                #     f.write('<p class="pdn subentry-text"><span class="se-info">Kunbalak</span><span>')
                #     f.write(sense["pdn"])
                #     f.write('</span></p>')

                # EXAMPLE SENTENCES
                if 'ex' in sense:

                    # LIST of example sentences
                    f.write('<ul>')
                    for example in sense["ex"]:
                        f.write('<li>')

                        # xv
                        if 'xv' in example:
                            f.write('<p class="xv">'+example["xv"]+'</p>')
                        # xe
                        if 'xe' in example:
                            f.write('<p class="xe">' + example["xe"] + '</p>')
                        # so
                        if 'so' in example:
                            f.write('<p class="xv">(' + example["so"] + ')</p>')


                        f.write('</li>')

                    f.write('</ul>')


        if 'uv' in entry:
            f.write('<p class="uv subentry-text end"><span class="se-info end">Language</span><span>')
            f.write(entry["uv"])
            f.write('</span></p>')

        if 'bw' in entry:
            f.write('<p class="bw subentry-text end"><span class="se-info end">Etymology</span><span>')
            f.write(entry["bw"])
            f.write('</span></p>')

        if 'cf' in entry:
            f.write('<p class="cf subentry-text end"><span class="se-info end">See also</span><span>')
            f.write(entry["cf"])
            f.write('</span></p>')

        if 'pdn' in entry:
            f.write('<p class="cf subentry-text end"><span class="se-info end">Kunbalak</span><span>')
            f.write(entry["pdn"])
            f.write('</span></p>')

        if 'ng' in entry:
            f.write('<p class="ng-grammar subentry-text end"><span class="se-info end">Grammar</span><span>')
            f.write(entry["ng"])
            f.write('</span></p>')

        # Sub-entries
        if 'se' in entry:
            # If there are subentries
            if len(entry["se"]) > 0:
                f.write('<div class="subentries">')

                # f.write('<p class="subentry-text margint end" style="margin-top: 20px;"><span class="se-info subentry-header end">Related words</span><span>')
                # f.write('</span></p>')

                for sub_entry in entry['se']:
                    if 'lx' in sub_entry:
                        f.write('<p class="se"><span class="sn">-</span>' + sub_entry["lx"] + '</p>')
                    if 'de' in sub_entry:
                        f.write('<p class="se-de"><span class="sn">&nbsp;  </span>' + sub_entry["de"] + '</p>')

                f.write('</div>')


        # End of entry
        f.write('</div>') # end of collapsible content section
        f.write('</article>')
    f.write('</div>') #end of wrapper

    f.write('<script src="script-bubble.js"></script>')
    f.write('<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c9d1639e157f497"></script>')
    f.write('</body>')
    f.write('</html>')


    f.close()

# # ADD JS TO FILE
# with open("script-bubble.js") as f:
#     with open("dict-for-web4.html", "a") as f1:
#         f1.write('<script>')
#         for line in f:
#             f1.write(line)
#         f1.write('</script>')
#         f1.write('</body>')
#         f1.write('</html>')
#     f1.close()
# f.close()


# with open('json.txt', 'w') as f2:
#     for entry in entries:
#         f2.write(json.dumps(entry))
# f2.close()


