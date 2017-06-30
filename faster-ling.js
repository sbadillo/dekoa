    var i = n(5),
        s = n(7),
        o = n(6),
        a = n(9),
        u = n(4),
        c = n(11),
        l = n(8),
        d = n(34),
        h = n(123),
        f = n(18),
        g = n(283),
        p = n(10),
        v = n(13),
        _ = n(92),
        
        m = {
            letterConversionMap: { "`": "'", "Â´": "'", "â€™": "'", "Ã ": "a", "Ã€": "A", "Ã¡": "a", "Ã": "A", "Ã¢": "a", "Ã‚": "A", "Ã¤": "a", "Ã„": "A", "Ã§": "c", "Ã‡": "C", "Ã©": "e", "Ã‰": "E", "Ã¨": "e", "Ãˆ": "E", "Ãª": "e", "ÃŠ": "E", "Ã«": "e", "Ã‹": "E", "Ã¯": "i", "Ã": "I", "Ã®": "i", "ÃŽ": "I", "Ã¬": "i", "ÃŒ": "I", "Ã­": "i", "Ã": "I", "Ã²": "o", "Ã’": "O", "Ã³": "o", "Ã“": "O", "Ã´": "o", "Ã”": "O", "Ã¶": "o", "Ã–": "O", "Ãµ": "o", "Ã•": "O", "Å“": "oe", "Å’": "OE", "Ã¹": "u", "Ã™": "U", "Ãº": "u", "Ãš": "U", "Ã»": "u", "Ã›": "U", "Ãœ": "U", "Ã¼": "u", "Ñ‘": "Ðµ", "Ð": "Ð•", "Ð¹": "Ð¸", "Ð™": "Ð˜", "Ã±": "n", "Ã‘": "N", "Å¡": "s", "Å ": "S", "Å¾": "z", "Å½": "Z" },
            pinyinLetterConversionMap: { "Ä": "a", "Ä€": "A", "Ã¡": "a", "Ã": "A", "ÇŽ": "a", "Ç": "A", "Ã ": "a", "Ã€": "A", "Ä“": "e", "Ä’": "E", "Ã©": "e", "Ã‰": "E", "Ä›": "e", "Äš": "E", "Ã¨": "e", "Ãˆ": "E", "Ä«": "i", "Äª": "I", "Ã­": "i", "Ã": "I", "Ç": "i", "Ç": "I", "Ã¬": "i", "ÃŒ": "I", "Å": "o", "ÅŒ": "O", "Ã³": "o", "Ã“": "O", "Ç’": "o", "Ç‘": "O", "Ã²": "o", "Ã’": "O", "Å«": "u", "Åª": "U", "Ãº": "u", "Ãš": "U", "Ç”": "u", "Ç“": "U", "Ã¹": "u", "Ã™": "U", "Ç–": "u", "Ç•": "U", "Ç˜": "u", "Ç—": "U", "Çš": "u", "Ç™": "U", "Çœ": "u", "Ç›": "U" },
            QUESTION_CHANGE_TIMEOUT: 1500,
            initialize: function() { this.initializeData(), o.on("userSignedOut", this.onUserSignedOut, this), this.adapter = new g },
            initializeData: function() { this.question = null, this.answer = null, this.previousModels = [], this.currentQuestionBackup = null, this.onPrevious = !1, this.lastEntry = null, this.previousGuessValue = null, this.lock = {}, this.outOfIdioms = !1, this.adaptiveLevels = { newWord: 1, repeatWord: 3, fastTracking: 9 }, this.adaptiveStacks = { newCards: [], repeatCards: [] }, this.wordHint = {}, this.debug = {} },
            onUserSignedOut: function() { console.log("GuessModel.onUserSignedOut"), this.initializeData() },
            setView: function(e) { this._guessView = e },
            firstSync: function() {
                var e = this;
                this.answer = null, this.onPrevious = !1, this.sync(function() { e.firstSyncDone() }), e.firstSyncDone() },
            firstSyncDone: function() {
                var e = this;
                return this.lock.syncing ? void 0 : Promise.resolve().then(function() {
                    return e.loadQuestion(e.newQuestion) }).then(function() {
                    return o.trigger("guess-pre-render"), e._guessView.render(), Promise.resolve() }) },
            sync: function(e) { this.lock.syncing = !0;
                var t = this,
                    n = function() { t.lock.syncing = !1, e() };
                return this.onPrevious ? void a.captureMessage("Can not sync on previous model", { level: "error", logger: "manual" }) : (s.isNull(this.answer) || (this.previousModels.push({ question: this.question, answer: this.answer }), this.previousModels.length >= 10 && this.previousModels.shift()), void Promise.resolve().then(function() {
                    return t.adapter.sync({ answer: t.answer, wordHint: t.wordHint }, t.question) }).then(function(e) { t.newQuestion = e.question, n() }).catch(function(e) { "OutOfQuestionsError" === e.name && (console.info("Out of questions."), t._guessView.showOutOfIdiomsMessage()), t.lock.syncing = !1, a.captureException(e, { level: "error", extra: { message: "Guess sync failed" } }) })) },
            getSize: function(e) {
                var t = -.17265948632973854 * e.length + 37.39270919635441;
                return t = t > 50 ? 50 : t, t / 16 },
            getSmallTranslations: function(e) {
                for (var t = 0, n = e.translations, r = 0; r < n.length; r++) {
                    var i = n[r],
                        s = i.translation.length;
                    i.begin_translation && (s += i.begin_translation.length + 1), i.end_translation && (s += i.end_translation.length + 1), s > t && (t = s) }
                return this.question.maxTranslationLength = t, 1 === n.length && t > 40 ? !0 : 2 === n.length && (t > 20 || e.translations_comments.length > 0) ? !0 : !1 },
            loadQuestion: function(e) {
                return this.question = e, this.question.wordLength = this.letterConversion(this.question.word).length, this.question.parsedContext = this.parseContext(this.question.parsedContext), this.question.guessInfoOpen = c.user.data.guess_info_open, this.question.fontSize = this.getSize(this.question.context), this.question.smallTranslations = this.getSmallTranslations(this.question), this.question.diacritics = h.getDiacritics(this.question.target_language), this.question.keyboard = this.getKeyboard(), this.answer = new r(e.ui_id, e.idiom_id, e.context_id, e.placement_test), Promise.resolve() },
            checkAnswer: function(e) { this.answer.all_entries.push(e), this.lastEntry = e, s.isNull(this.answer.opened) ? (this.answer.opened = u().valueOf(), this.answer.firstTry = !0) : this.answer.firstTry = !1, null === this.answer.answer && (this.answer.answer = e);
                var t = this.letterConversion(e);
                if (this.isCorrect(t)) return this.answer.confirmed = u().valueOf(), null === this.answer.guess_value && (this.answer.guess_value = 1), c.isQuestionHintAdaptive() && this.answer.firstTry && this.adaptQuestionHintLevel(!0), this.correctAnswer(), { answerCorrect: !0, tryAgainTriggered: !1 };
                if (0 === t.length) return null === this.answer.guess_value && (this.answer.guess_value = 0), c.isQuestionHintAdaptive() && this.adaptQuestionHintLevel(!1), o.trigger("guess-empty-answer"), this._guessView.displayEvaluation("empty-answer", {}), { answerCorrect: !1, tryAgainTriggered: !1 };
                var n = this.isEquivalent(t);
                if (n.found) return this.answer.confirmed = u().valueOf(), null === this.answer.guess_value && (this.answer.guess_value = 1), this.answer.equivalent_answer = n.equivalent_answer, this.correctAnswer(), { answerCorrect: !0, tryAgainTriggered: !1 };
                var r = this.getDifference(t);
                if (null === this.answer.guess_value && (this.answer.guess_value = r), this.isInterfering(e)) this._guessView.displayEvaluation("interfering-answer", {});
                else {
                    var i = this.answer.all_entries.length;
                    if (1 === i && this.userShouldTryAgain(t)) return this.answer.guess_value = null, this.answer.answer = null, this.answer.try_again_used = "yes", this._guessView.showTryAgainButton(), v.instance.getController("Onboarding").showTryAgain(e), { answerCorrect: !1, tryAgainTriggered: !0 };
                    v.instance.getController("Onboarding").showGuessIncorrectAnswerTooltip(), this._guessView.displayEvaluation("wrong-answer", { guessValue: r }) }
                return { answerCorrect: !1, tryAgainTriggered: !1 } },
            userShouldTryAgain: function(e) {
                var t = this.question.tryAgain;
                return t && s.has(t, "mistakes") && t.mistakes.length > 0 ? t.mistakes.indexOf(e) > -1 : !1 },
            next: function() {
                var e = this;
                return console.log("Next card locks. Timeout: ", this.lock.cardChangeTimeout, "Audio", this.lock.audioDonePlaying, "Syncing: ", !this.lock.syncing), this.lock.cardChangeTimeout && this.lock.audioDonePlaying && !this.lock.syncing ? (l.instance.getUser().isTrialExpired() && o.history.navigate("account", { trigger: !0 }), Promise.resolve().then(function() {
                    return e.loadQuestion(e.newQuestion) }).then(function() {
                    return o.trigger("guess-pre-render"), e._guessView.render(), Promise.resolve() })) : void 0 },
            correctAnswer: function() {
                var e = this;
                o.trigger("guess-correct-answer"), this.lock.cardChangeTimeout = !1, this.lock.audioDonePlaying = !1, setTimeout(function() { e.lock.cardChangeTimeout = !0, e.next() }, this.QUESTION_CHANGE_TIMEOUT), this.sync(function() { e.next() }), this._guessView.playContextAudio(function() { e.lock.audioDonePlaying = !0, e.next() }), 0 === this.question.times_learned ? o.trigger("guess:correct-new-answer-entered") : this._guessView.showedAnswer || o.trigger("guess:correct-remembered-answer-entered"), this._guessView.displayEvaluation("correct-answer", {}) },
            hasGrammarTable: function() {
                return s.isString(this.question.tutor_grammar_table_url) && this.question.tutor_grammar_table_url.length },
            hasGrammarHint: function() {
                return s.isString(this.question.grammar_hint_key) },
            isCorrect: function(e) {
                var t = this.letterConversion(this.question.word);
                return e === t },
            isEquivalent: function(e) {
                for (var t = this.question.equivalent_words, n = 0; n < t.length; n++)
                    if (e === this.letterConversion(t[n])) return { found: !0, equivalent_answer: t[n] };
                return { found: !1 } },
            isInterfering: function() {
                return !1 },
            letterConversion: function(e) {
                return s.each(this.letterConversionMap, s.bind(function(t, n) { e = this.replaceAll(e, n, t) }, this)), "zh-Latn-pinyin" === l.instance.getUser().getCourse().getInfo().target_language && s.each(this.pinyinLetterConversionMap, s.bind(function(t, n) { e = this.replaceAll(e, n, t) }, this)), e.toLowerCase().trim() },
            replaceAll: function(e, t, n) {
                return e.replace(new RegExp(t, "g"), n) },
            getDifference: function(e) {
                return d.similarText(this.letterConversion(this.question.word), e, 1) / 100 },
            hasPrevious: function() {
                return this.previousModels.length > 0 },
            switchToPrevious: function() {
                if (!this.lock.cardChangeTimeout || !this.lock.audioDonePlaying || this.lock.syncing) return !1;
                this.currentQuestionBackup = this.question;
                var e = this.previousModels[this.previousModels.length - 1];
                return this.answer = e.answer, this.question = e.question, this.onPrevious = !0, !0 },
            switchToCurrent: function() {
                var e = this;
                return null !== this.currentQuestionBackup ? (this.onPrevious = null, this.answer = null, Promise.resolve().then(function() {
                    return e.loadQuestion(e.currentQuestionBackup) }).then(function() {
                    return o.trigger("guess-pre-render"), e._guessView.render(), Promise.resolve() })) : void this.firstSync() },
            getQuestion: function() {
                return this.question ? this.question : (this.firstSync(), null) },
            parseContext: function(e) {
                var t = /'$/,
                    n = /[.?!]/;
                if (e)
                    for (var r = 1; r < e.length; r++) {
                        var i = e[r],
                            o = e[r - 1];
                        t.test(o.word) && (o.noWrapStart = !0, i.noWrapEnd = !0, i.current && (o.integrateStart = !0, i.integrateEnd = !0)), n.test(i.after) && (o.noWrapStart = !0, i.noWrapEnd = !0) }
                var a = s.findIndex(e, { current: !0 }),
                    u = s.slice(e, 0, a),
                    c = s.slice(e, a + 1),
                    l = !1;
                if (u.length > 0) { s.first(u).beginOpen = !0, s.last(u).beginClose = !0;
                    var d = s.reduce(u, function(e, t) {
                        return e + t.word.length }, 0);
                    (u.length > 1 || d > 4) && (s.first(u).wideBegin = !0), l = !0 }
                if (c.length > 0) { s.first(c).endOpen = !0, s.last(c).endClose = !0;
                    var h = s.reduce(c, function(e, t) {
                        return e + t.word.length }, 0);
                    (l || h > 4) && (s.first(c).wideEnd = !0) }
                return e },
            getWordTranslation: function(e, t, n) {
                var r = this;
                i.ajax({ url: p.get("api-url") + "/translation/get_translations", type: "POST", contentType: "application/json", dataType: "json", data: JSON.stringify({ language: l.instance.getUser().getCourse().getInfo().target_language, languageSource: l.instance.getUser().getCourse().getInfo().source_language, previousWord: t.trim(), word: e.trim() }), success: function(e) { e && e.translation && e.translation.length > 0 ? r._guessView.showWordTranslation(e.translation, n) : r._guessView.showWordTranslationMissing(n) } }), this.registerEvent(e) },
            registerEvent: function(e) { i.ajax({ url: p.get("api-url") + "/read/event?", type: "POST", contentType: "application/json", dataType: "json", data: JSON.stringify({ event_type: "WORD", word: e, course_uuid: l.instance.getUser().getCourse().UUID, language: l.instance.getUser().getCourse().getInfo().target_language }) }) },
            isNewWord: function() {
                return !this.onPrevious && 0 === this.question.times_learned },
            getAdaptiveLevel: function() {
                return this.adaptiveLevels = c.getAdaptiveQuestionHintLevels(), console.log("adaptive levels - new:", this.adaptiveLevels.newWord, "repeat:", this.adaptiveLevels.repeatWord), l.instance.getUser().getCourse().getFastTrackingState().isInProgress() ? this.adaptiveLevels.fastTracking : this.isNewWord() ? this.adaptiveLevels.newWord : this.adaptiveLevels.repeatWord },
            adaptQuestionHintLevel: function(e) {
                var t = 3;
                if (!l.instance.getUser().getCourse().getFastTrackingState().isInProgress())
                    if (this.isNewWord()) {
                        if (this.adaptiveStacks.newCards.push(e), this.adaptiveStacks.newCards.length === t) {
                            var n = this.adaptiveStacks.newCards.reduce(function(e, t) {
                                return e + t }, 0);
                            this.changeHintLevelForNew(n > 1 ? 1 : -1), this.adaptiveStacks.newCards = [] } } else if (this.adaptiveStacks.repeatCards.push(e), this.adaptiveStacks.repeatCards.length === t) {
                    var r = this.adaptiveStacks.repeatCards.reduce(function(e, t) {
                        return e + t }, 0);
                    this.changeHintLevelForRepeat(r > 1 ? 1 : -1), this.adaptiveStacks.repeatCards = [] } },
            changeHintLevelForNew: function(e) { console.log("changeHintLevelForNew", e), -1 === e && this.adaptiveLevels.newWord > 4 ? this.adaptiveLevels.newWord -= 1 : 1 === e && this.adaptiveLevels.newWord < 9 ? this.adaptiveLevels.newWord += 1 : 2 === e && this.adaptiveLevels.newWord < 8 ? this.adaptiveLevels.newWord += 2 : 2 === e && 8 === this.adaptiveLevels.newWord && (this.adaptiveLevels.newWord += 1), c.setAdaptiveQuestionHintLevel("new", this.adaptiveLevels.newWord) },
            changeHintLevelForRepeat: function(e) { console.log("changeHintLevelForRepeat", e), -1 === e && this.adaptiveLevels.repeatWord > 4 ? this.adaptiveLevels.repeatWord -= 1 : 1 === e && this.adaptiveLevels.repeatWord < 9 && (this.adaptiveLevels.repeatWord += 1), c.setAdaptiveQuestionHintLevel("repeat", this.adaptiveLevels.repeatWord) },
            getQuestionHintData: function() {
                var e = c.getHintConfig(),
                    t = { enabled: !1 };
                if (e.enabled) { t.enabled = !0;
                    var n = this.getQuestion().word,
                        r = this.question.isPlacementTestQuestion,
                        i = {},
                        s = "",
                        o = this.getAdaptiveLevel(),
                        a = this.getHintRules();
                    e.confusionHints && void 0 !== a && void 0 !== a.letters && (o > 4 || 3 === o && n.length > 1) ? (s = "rules", i = new _(n, _.hintLevels().LEVEL_9, r), r ? console.log("Hint level 9. FastTracking in progress") : (console.log("Hint Type: rules"), i.setHintRules(a.letters))) : (s = "aui", !c.isAdvanced() && !e.adaptHintForBeginners || c.isAdvanced() && !e.adaptHintForAdvanced ? (o = _.hintLevels().LEVEL_9, console.log("Hint type: aui. Level: locked to 9")) : console.log(r ? "Hint type: aui. Level: locked to 9. FastTracking in progress" : "Hint type: aui. Level: " + o), i = new _(n, o, r)), this.setWordHint({ letters: i.getHintLetterIndices(), underscores: !0, source: s }), t.mask = i.getMask() }
                return t },
            getKeyboard: function() {
                var e = l.instance.getUser().getCourse().UUID;
                return "6be5c9ac-c3ad-4097-8926-a93c51da13f2" === e ? "ru" : void 0 },
            getMilestoneAwardData: function(e) {
                var t = { cardsCount: 0, timeElapsed: 0, newCardsCount: 0, correctRepeatCardsCount: 0, wrongRepeatCardsCount: 0 };
                return e.groups.forEach(function(e) { t.cardsCount += e.total_cards_in_group, t.timeElapsed += e.study_time, t.newCardsCount += e.new_cards, t.correctRepeatCardsCount += e.repeated_cards, t.wrongRepeatCardsCount += e.total_cards_in_group - (e.new_cards + e.repeated_cards) }), t },
            hasReachedMilestoneAward: function(e) {
                var t = e.cards_per_badge,
                    n = e.groups.map(function(e) {
                        return e.total_cards_in_group }).reduce(function(e, t) {
                        return e + t }, 0);
                return console.debug("milestoneCard: " + n + " / " + t), n === t },
            checkMilestoneProgress: function() {
                var e = l.instance.getUser().getCourse().getStatistics().getData();
                if (this.hasReachedMilestoneAward(e.badge_progress)) {
                    var t = l.instance.getUser().getCourse().UUID,
                        n = this.getMilestoneAwardData(e.badge_progress);
                    l.instance.getUser().getEventSender().sendAwardEventV0(t, n) } },
            getHintRules: function() {
                return this.question.hintRules
            },
            setWordHint: function(e) { console.log("Setting Word Hint: ", e), this.wordHint = e }
        };
    m.initialize(), 