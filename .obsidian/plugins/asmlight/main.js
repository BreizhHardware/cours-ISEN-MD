"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AsmlightPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/adapters/styles.ts
var CM_STYLE = {
  comment: "comment",
  label: "type",
  mnemonic: "keyword",
  directive: "operator",
  register: "variable-2",
  number: "number",
  string: "string",
  reloc: "builtin",
  keyword: "keyword",
  function: "builtin",
  variable: "variable-2",
  operator: "operator",
  property: "property"
};
var PRISM_CLASS = {
  comment: "comment",
  label: "function",
  mnemonic: "keyword",
  directive: "tag",
  register: "variable",
  number: "number",
  string: "string",
  reloc: "builtin",
  keyword: "keyword",
  function: "builtin",
  variable: "variable",
  operator: "operator",
  property: "property"
};

// src/adapters/cm5.ts
function toCm5Mode(lang) {
  var _a, _b;
  const parser = lang.makeParser();
  return {
    name: lang.id,
    startState: () => parser.startState(),
    copyState: (state) => parser.copyState(state),
    token(stream, state) {
      var _a2, _b2;
      const kind = parser.token(stream, state);
      if (!kind) return null;
      return `${CM_STYLE[kind]} asmlight-${kind} asmlight-lang-${(_b2 = (_a2 = parser.tokenLang) == null ? void 0 : _a2.call(parser, state)) != null ? _b2 : lang.id}`;
    },
    lineComment: lang.lineComment,
    blockCommentStart: (_a = lang.blockComment) == null ? void 0 : _a[0],
    blockCommentEnd: (_b = lang.blockComment) == null ? void 0 : _b[1]
  };
}
var mimeFor = (lang) => `text/x-asmlight-${lang.id}`;
var replaced = /* @__PURE__ */ new Map();
function registerCm5Modes(CM, langs) {
  var _a, _b, _c, _d;
  if (!CM) return;
  for (const lang of langs) {
    const tags = [lang.id, ...lang.aliases];
    for (const tag of tags) {
      const prev = (_a = CM.modes) == null ? void 0 : _a[tag];
      if (prev !== void 0 && !replaced.has(tag)) replaced.set(tag, prev);
      (_b = CM.defineMode) == null ? void 0 : _b.call(CM, tag, () => toCm5Mode(lang));
    }
    (_c = CM.defineMIME) == null ? void 0 : _c.call(CM, mimeFor(lang), lang.id);
    if (Array.isArray(CM.modeInfo)) {
      const taken = /* @__PURE__ */ new Set();
      for (const m of CM.modeInfo) {
        taken.add(m.name.toLowerCase());
        for (const a of (_d = m.alias) != null ? _d : []) taken.add(a.toLowerCase());
      }
      const free = tags.filter((t) => !taken.has(t.toLowerCase()));
      const name = taken.has(lang.name.toLowerCase()) ? `${lang.name} (Asmlight)` : lang.name;
      if (free.length && !taken.has(name.toLowerCase())) {
        CM.modeInfo.push({ name, mime: mimeFor(lang), mode: lang.id, alias: free });
      }
    }
  }
}
function unregisterCm5Modes(CM, langs) {
  var _a;
  if (!CM) return;
  for (const lang of langs) {
    for (const tag of [lang.id, ...lang.aliases]) {
      if (!CM.modes) continue;
      if (replaced.has(tag)) CM.modes[tag] = replaced.get(tag);
      else delete CM.modes[tag];
      replaced.delete(tag);
    }
    (_a = CM.mimeModes) == null ? true : delete _a[mimeFor(lang)];
    if (Array.isArray(CM.modeInfo)) {
      for (let i = CM.modeInfo.length - 1; i >= 0; i--) {
        if (CM.modeInfo[i].mime === mimeFor(lang) && CM.modeInfo[i].mode === lang.id) CM.modeInfo.splice(i, 1);
      }
    }
  }
}

// src/docs/table.ts
function docTable(src) {
  const out = /* @__PURE__ */ new Map();
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const [keys, summary, syntax, operation] = line.split("\xA6").map((c) => c.trim());
    if (!summary) throw new Error(`asmlight: doc row without summary: ${line}`);
    const entry = { summary };
    if (syntax) entry.syntax = syntax;
    if (operation) entry.operation = operation;
    for (const key of keys.split(/\s+/)) out.set(key, entry);
  }
  return out;
}
var CONDITIONS = {
  eq: "EQ: equal (Z == 1)",
  ne: "NE: not equal (Z == 0)",
  cs: "CS/HS: carry set, unsigned \u2265 (C == 1)",
  hs: "HS/CS: unsigned \u2265 (C == 1)",
  cc: "CC/LO: carry clear, unsigned < (C == 0)",
  lo: "LO/CC: unsigned < (C == 0)",
  mi: "MI: negative (N == 1)",
  pl: "PL: positive or zero (N == 0)",
  vs: "VS: overflow (V == 1)",
  vc: "VC: no overflow (V == 0)",
  hi: "HI: unsigned > (C == 1 && Z == 0)",
  ls: "LS: unsigned \u2264 (C == 0 || Z == 1)",
  ge: "GE: signed \u2265 (N == V)",
  lt: "LT: signed < (N != V)",
  gt: "GT: signed > (Z == 0 && N == V)",
  le: "LE: signed \u2264 (Z == 1 || N != V)",
  al: "AL: always"
};

// src/docs/arm32.ts
var INSTR = docTable(`
adc \xA6 Add with carry \xA6 adc{s}{cond} Rd, Rn, Op2 \xA6 Rd = Rn + Op2 + C
add \xA6 Add \xA6 add{s}{cond} Rd, Rn, Op2 \xA6 Rd = Rn + Op2
adr \xA6 Form a PC-relative address \xA6 adr{cond} Rd, label \xA6 Rd = address of label
and \xA6 Bitwise AND \xA6 and{s}{cond} Rd, Rn, Op2 \xA6 Rd = Rn & Op2
asr \xA6 Arithmetic shift right \xA6 asr{s}{cond} Rd, Rm, #n / Rs \xA6 Rd = Rm >>s n
b \xA6 Branch \xA6 b{cond} label \xA6 PC = label
bfc \xA6 Bit field clear \xA6 bfc Rd, #lsb, #width \xA6 Rd[lsb+width-1:lsb] = 0
bfi \xA6 Bit field insert \xA6 bfi Rd, Rn, #lsb, #width \xA6 Rd[lsb+width-1:lsb] = Rn[width-1:0]
bic \xA6 Bit clear \xA6 bic{s}{cond} Rd, Rn, Op2 \xA6 Rd = Rn & ~Op2
bkpt \xA6 Breakpoint: halts into the debugger (a HardFault on Cortex-M with no debugger attached) \xA6 bkpt #imm
bl \xA6 Branch with link (function call) \xA6 bl{cond} label \xA6 LR = return address; PC = label
blx \xA6 Branch with link and exchange instruction set \xA6 blx Rm / blx label \xA6 LR = return address; PC = Rm & ~1; Thumb = Rm[0]
bx \xA6 Branch and exchange instruction set; bx lr returns from a function, and on Cortex-M an EXC_RETURN value in LR returns from an exception \xA6 bx{cond} Rm \xA6 PC = Rm & ~1; Thumb = Rm[0]
bxj \xA6 Branch and change to Jazelle state (legacy) \xA6 bxj Rm
cbnz \xA6 Compare and branch if non-zero (Thumb; forward only, r0\u2013r7) \xA6 cbnz Rn, label \xA6 if (Rn != 0) PC = label
cbz \xA6 Compare and branch if zero (Thumb; forward only, r0\u2013r7) \xA6 cbz Rn, label \xA6 if (Rn == 0) PC = label
clrex \xA6 Clear the local exclusive monitor (e.g. on context switch) \xA6 clrex
clz \xA6 Count leading zeros \xA6 clz Rd, Rm
cmn \xA6 Compare negative: sets flags from an addition \xA6 cmn Rn, Op2 \xA6 flags = Rn + Op2
cmp \xA6 Compare: sets flags from a subtraction \xA6 cmp Rn, Op2 \xA6 flags = Rn - Op2
cps \xA6 Change processor state / mode (A-profile, privileged) \xA6 cps #mode
cpsid \xA6 Disable interrupts. Cortex-M: i sets PRIMASK (masks all configurable-priority exceptions), f sets FAULTMASK. A-profile: sets CPSR.I / CPSR.F \xA6 cpsid i / cpsid f
cpsie \xA6 Enable interrupts. Cortex-M: i clears PRIMASK, f clears FAULTMASK. A-profile: clears CPSR.I / CPSR.F \xA6 cpsie i / cpsie f
dmb \xA6 Data memory barrier: memory accesses before it are observed before those after it \xA6 dmb {sy, ish, ...}
dsb \xA6 Data synchronization barrier: waits until all earlier memory accesses complete \xA6 dsb {sy, ish, ...}
eor \xA6 Bitwise exclusive OR \xA6 eor{s}{cond} Rd, Rn, Op2 \xA6 Rd = Rn ^ Op2
isb \xA6 Instruction synchronization barrier: flushes the pipeline so later instructions see earlier changes (needed after writing CONTROL, system registers or code) \xA6 isb
it \xA6 If-Then (Thumb-2): makes up to 4 following instructions conditional; each T executes on cond, each E on the inverse \xA6 it{x{y{z}}} cond
ldm ldmia ldmfd \xA6 Load multiple, increment after (ldmfd = pop from a full-descending stack) \xA6 ldm Rn{!}, {reglist} \xA6 for each r: r = M[Rn]; Rn += 4
ldmib \xA6 Load multiple, increment before (A32) \xA6 ldmib Rn{!}, {reglist}
ldmda \xA6 Load multiple, decrement after (A32) \xA6 ldmda Rn{!}, {reglist}
ldmdb \xA6 Load multiple, decrement before \xA6 ldmdb Rn{!}, {reglist}
ldr \xA6 Load word; ldr Rt, =value is a pseudo-instruction that loads from a literal pool \xA6 ldr Rt, [Rn, #off]{!} / ldr Rt, [Rn], #off \xA6 Rt = M32[address]
ldrb \xA6 Load byte, zero-extended \xA6 ldrb Rt, [Rn, #off] \xA6 Rt = zext(M8[address])
ldrh \xA6 Load halfword, zero-extended \xA6 ldrh Rt, [Rn, #off] \xA6 Rt = zext(M16[address])
ldrsb \xA6 Load byte, sign-extended \xA6 ldrsb Rt, [Rn, #off] \xA6 Rt = sext(M8[address])
ldrsh \xA6 Load halfword, sign-extended \xA6 ldrsh Rt, [Rn, #off] \xA6 Rt = sext(M16[address])
ldrd \xA6 Load two consecutive words \xA6 ldrd Rt, Rt2, [Rn, #off] \xA6 Rt = M32[a]; Rt2 = M32[a + 4]
ldrex \xA6 Load exclusive: loads and marks the address in the exclusive monitor (pair with strex for atomics / mutexes) \xA6 ldrex Rt, [Rn] \xA6 Rt = M32[Rn]; monitor = Rn
ldrexb ldrexh ldrexd \xA6 Load exclusive byte / halfword / doubleword \xA6 ldrexb Rt, [Rn]
ldrt \xA6 Load word with unprivileged access (as if from user mode) \xA6 ldrt Rt, [Rn], #off
lsl \xA6 Logical shift left \xA6 lsl{s}{cond} Rd, Rm, #n / Rs \xA6 Rd = Rm << n
lsr \xA6 Logical shift right \xA6 lsr{s}{cond} Rd, Rm, #n / Rs \xA6 Rd = Rm >>u n
mcr \xA6 Move to coprocessor from register (e.g. write a CP15 system register) \xA6 mcr p15, op1, Rt, CRn, CRm, op2
mrc \xA6 Move to register from coprocessor (e.g. read a CP15 system register) \xA6 mrc p15, op1, Rt, CRn, CRm, op2
mla \xA6 Multiply-accumulate \xA6 mla Rd, Rn, Rm, Ra \xA6 Rd = Ra + Rn \xD7 Rm
mls \xA6 Multiply-subtract \xA6 mls Rd, Rn, Rm, Ra \xA6 Rd = Ra - Rn \xD7 Rm
mov \xA6 Move \xA6 mov{s}{cond} Rd, Op2 \xA6 Rd = Op2
movt \xA6 Move to top halfword (pair with movw to build a 32-bit constant) \xA6 movt Rd, #imm16 \xA6 Rd[31:16] = imm16
movw \xA6 Move 16-bit immediate, zero-extended \xA6 movw Rd, #imm16 \xA6 Rd = imm16
mrs \xA6 Read a special register: CPSR/SPSR on A-profile; APSR, IPSR, MSP, PSP, PRIMASK, BASEPRI, CONTROL ... on Cortex-M \xA6 mrs Rd, spec_reg \xA6 Rd = spec_reg
msr \xA6 Write a special register (e.g. msr PSP, r0 when switching RTOS tasks) \xA6 msr spec_reg, Rn \xA6 spec_reg = Rn
mul \xA6 Multiply, low 32 bits \xA6 mul{s} Rd, Rn, Rm \xA6 Rd = (Rn \xD7 Rm)[31:0]
mvn \xA6 Move NOT \xA6 mvn{s}{cond} Rd, Op2 \xA6 Rd = ~Op2
neg \xA6 Negate (alias of rsb Rd, Rm, #0) \xA6 neg Rd, Rm \xA6 Rd = 0 - Rm
nop \xA6 No operation \xA6 nop
orn \xA6 OR NOT (Thumb-2) \xA6 orn{s} Rd, Rn, Op2 \xA6 Rd = Rn | ~Op2
orr \xA6 Bitwise OR \xA6 orr{s}{cond} Rd, Rn, Op2 \xA6 Rd = Rn | Op2
pkhbt \xA6 Pack halfword: bottom from Rn, top from shifted Rm \xA6 pkhbt Rd, Rn, Rm{, lsl #n} \xA6 Rd = {Rm'[31:16], Rn[15:0]}
pop \xA6 Pop registers from the stack; popping PC returns \xA6 pop {reglist} \xA6 ldmia sp!, {reglist}
push \xA6 Push registers onto the stack (full descending) \xA6 push {reglist} \xA6 stmdb sp!, {reglist}
qadd \xA6 Saturating add \xA6 qadd Rd, Rm, Rn \xA6 Rd = sat32(Rm + Rn); sets Q on saturation
qsub \xA6 Saturating subtract \xA6 qsub Rd, Rm, Rn \xA6 Rd = sat32(Rm - Rn); sets Q on saturation
rbit \xA6 Reverse bit order \xA6 rbit Rd, Rm
rev \xA6 Reverse byte order in a word (endianness swap) \xA6 rev Rd, Rm
rev16 \xA6 Reverse byte order in each halfword \xA6 rev16 Rd, Rm
revsh \xA6 Reverse bytes in the low halfword, sign-extend \xA6 revsh Rd, Rm
ror \xA6 Rotate right \xA6 ror{s} Rd, Rm, #n / Rs \xA6 Rd = Rm rotr n
rrx \xA6 Rotate right by one through carry \xA6 rrx{s} Rd, Rm \xA6 Rd = {C, Rm[31:1]}
rsb \xA6 Reverse subtract \xA6 rsb{s}{cond} Rd, Rn, Op2 \xA6 Rd = Op2 - Rn
rsc \xA6 Reverse subtract with carry (A32 only) \xA6 rsc{s} Rd, Rn, Op2 \xA6 Rd = Op2 - Rn - !C
sbc \xA6 Subtract with carry \xA6 sbc{s}{cond} Rd, Rn, Op2 \xA6 Rd = Rn - Op2 - !C
sbfx \xA6 Signed bit field extract \xA6 sbfx Rd, Rn, #lsb, #width \xA6 Rd = sext(Rn[lsb+width-1:lsb])
sdiv \xA6 Signed divide (result truncated toward zero) \xA6 sdiv Rd, Rn, Rm \xA6 Rd = Rn /s Rm
sev \xA6 Send event: wakes cores waiting in wfe \xA6 sev
smlal \xA6 Signed multiply-accumulate long (64-bit) \xA6 smlal RdLo, RdHi, Rn, Rm \xA6 RdHi:RdLo += Rn \xD7s Rm
smull \xA6 Signed multiply long (64-bit result) \xA6 smull RdLo, RdHi, Rn, Rm \xA6 RdHi:RdLo = Rn \xD7s Rm
ssat \xA6 Signed saturate to n bits \xA6 ssat Rd, #n, Rm \xA6 Rd = clamp(Rm, -2^(n-1), 2^(n-1)-1)
stm stmia stmea \xA6 Store multiple, increment after \xA6 stm Rn{!}, {reglist} \xA6 for each r: M[Rn] = r; Rn += 4
stmib \xA6 Store multiple, increment before (A32) \xA6 stmib Rn{!}, {reglist}
stmda \xA6 Store multiple, decrement after (A32) \xA6 stmda Rn{!}, {reglist}
stmdb stmfd \xA6 Store multiple, decrement before (stmfd = push onto a full-descending stack) \xA6 stmdb Rn{!}, {reglist}
str \xA6 Store word \xA6 str Rt, [Rn, #off]{!} / str Rt, [Rn], #off \xA6 M32[address] = Rt
strb \xA6 Store byte \xA6 strb Rt, [Rn, #off] \xA6 M8[address] = Rt[7:0]
strh \xA6 Store halfword \xA6 strh Rt, [Rn, #off] \xA6 M16[address] = Rt[15:0]
strd \xA6 Store two consecutive words \xA6 strd Rt, Rt2, [Rn, #off] \xA6 M32[a] = Rt; M32[a + 4] = Rt2
strex \xA6 Store exclusive: stores only if the exclusive monitor still holds the address \xA6 strex Rd, Rt, [Rn] \xA6 if exclusive { M32[Rn] = Rt; Rd = 0 } else Rd = 1
strexb strexh strexd \xA6 Store exclusive byte / halfword / doubleword \xA6 strexb Rd, Rt, [Rn]
strt \xA6 Store word with unprivileged access \xA6 strt Rt, [Rn], #off
sub \xA6 Subtract \xA6 sub{s}{cond} Rd, Rn, Op2 \xA6 Rd = Rn - Op2
svc swi \xA6 Supervisor call: raises the SVC exception (system call; SVCall handler on Cortex-M, often used to start the first RTOS task) \xA6 svc #imm
swp \xA6 Swap word (deprecated; use ldrex/strex) \xA6 swp Rt, Rt2, [Rn]
sxtb \xA6 Sign-extend byte \xA6 sxtb Rd, Rm \xA6 Rd = sext(Rm[7:0])
sxth \xA6 Sign-extend halfword \xA6 sxth Rd, Rm \xA6 Rd = sext(Rm[15:0])
tbb \xA6 Table branch byte (Thumb-2 switch statement) \xA6 tbb [Rn, Rm] \xA6 PC += 2 \xD7 M8[Rn + Rm]
tbh \xA6 Table branch halfword (Thumb-2 switch statement) \xA6 tbh [Rn, Rm, lsl #1] \xA6 PC += 2 \xD7 M16[Rn + 2\xD7Rm]
teq \xA6 Test equivalence: sets flags from XOR \xA6 teq Rn, Op2 \xA6 flags = Rn ^ Op2
tst \xA6 Test bits: sets flags from AND \xA6 tst Rn, Op2 \xA6 flags = Rn & Op2
ubfx \xA6 Unsigned bit field extract \xA6 ubfx Rd, Rn, #lsb, #width \xA6 Rd = zext(Rn[lsb+width-1:lsb])
udf \xA6 Permanently undefined: always raises an undefined-instruction exception \xA6 udf #imm
udiv \xA6 Unsigned divide \xA6 udiv Rd, Rn, Rm \xA6 Rd = Rn /u Rm
umlal \xA6 Unsigned multiply-accumulate long (64-bit) \xA6 umlal RdLo, RdHi, Rn, Rm \xA6 RdHi:RdLo += Rn \xD7u Rm
umull \xA6 Unsigned multiply long (64-bit result) \xA6 umull RdLo, RdHi, Rn, Rm \xA6 RdHi:RdLo = Rn \xD7u Rm
usat \xA6 Unsigned saturate to n bits \xA6 usat Rd, #n, Rm \xA6 Rd = clamp(Rm, 0, 2^n - 1)
uxtb \xA6 Zero-extend byte \xA6 uxtb Rd, Rm \xA6 Rd = Rm[7:0]
uxth \xA6 Zero-extend halfword \xA6 uxth Rd, Rm \xA6 Rd = Rm[15:0]
wfe \xA6 Wait for event: sleep until an event (sev, interrupt, exclusive monitor clear) \xA6 wfe
wfi \xA6 Wait for interrupt: sleep until an interrupt is pending (RTOS idle loop) \xA6 wfi
yield \xA6 Hint that the thread is spinning \xA6 yield
vabs \xA6 VFP/NEON absolute value \xA6 vabs.f32 Sd, Sm \xA6 Sd = |Sm|
vadd \xA6 VFP/NEON add \xA6 vadd.f32 Sd, Sn, Sm \xA6 Sd = Sn + Sm
vcmp \xA6 VFP compare; flags go to FPSCR, copy them with vmrs APSR_nzcv, fpscr \xA6 vcmp.f32 Sd, Sm
vcvt \xA6 VFP/NEON convert between float and integer / fixed-point formats \xA6 vcvt.s32.f32 Sd, Sm
vdiv \xA6 VFP divide \xA6 vdiv.f32 Sd, Sn, Sm \xA6 Sd = Sn / Sm
vdup \xA6 NEON duplicate a scalar into all lanes \xA6 vdup.32 Qd, Rm
vext \xA6 NEON extract a vector from a pair \xA6 vext.8 Qd, Qn, Qm, #imm
vld1 vld2 vld3 vld4 \xA6 NEON load with 1\u20134-way (de)interleave \xA6 vld1.32 {Dd, Dd2}, [Rn]
vldm \xA6 VFP load multiple \xA6 vldm Rn{!}, {reglist}
vldr \xA6 VFP load single register \xA6 vldr Sd, [Rn, #off]
vmla \xA6 VFP/NEON multiply-accumulate \xA6 vmla.f32 Sd, Sn, Sm \xA6 Sd += Sn \xD7 Sm
vmls \xA6 VFP/NEON multiply-subtract \xA6 vmls.f32 Sd, Sn, Sm \xA6 Sd -= Sn \xD7 Sm
vmov \xA6 VFP/NEON move between core, single, double and vector registers, or load an immediate \xA6 vmov Sd, Rt / vmov.f32 Sd, #imm
vmrs \xA6 Move from VFP system register (e.g. FPSCR) \xA6 vmrs Rt, fpscr
vmsr \xA6 Move to VFP system register \xA6 vmsr fpscr, Rt
vmul \xA6 VFP/NEON multiply \xA6 vmul.f32 Sd, Sn, Sm \xA6 Sd = Sn \xD7 Sm
vneg \xA6 VFP/NEON negate \xA6 vneg.f32 Sd, Sm \xA6 Sd = -Sm
vpop \xA6 Pop VFP registers from the stack \xA6 vpop {reglist}
vpush \xA6 Push VFP registers onto the stack (s16\u2013s31 are callee-saved) \xA6 vpush {reglist}
vsqrt \xA6 VFP square root \xA6 vsqrt.f32 Sd, Sm \xA6 Sd = \u221ASm
vst1 vst2 vst3 vst4 \xA6 NEON store with 1\u20134-way interleave \xA6 vst1.32 {Dd}, [Rn]
vstm \xA6 VFP store multiple \xA6 vstm Rn{!}, {reglist}
vstr \xA6 VFP store single register \xA6 vstr Sd, [Rn, #off]
vsub \xA6 VFP/NEON subtract \xA6 vsub.f32 Sd, Sn, Sm \xA6 Sd = Sn - Sm
vand vorr veor vbic \xA6 NEON bitwise AND / OR / XOR / bit clear \xA6 vand Qd, Qn, Qm
vmax vmin \xA6 NEON lane-wise maximum / minimum \xA6 vmax.s32 Qd, Qn, Qm
vshl vshr \xA6 NEON shift left / right \xA6 vshr.u32 Qd, Qm, #n
vqadd vqsub \xA6 NEON saturating add / subtract \xA6 vqadd.s16 Qd, Qn, Qm
vtbl \xA6 NEON table lookup (byte permute) \xA6 vtbl.8 Dd, {Dn}, Dm
vzip vuzp vtrn \xA6 NEON interleave / de-interleave / transpose \xA6 vzip.16 Dd, Dm
vrev64 \xA6 NEON reverse elements within 64-bit doublewords \xA6 vrev64.32 Qd, Qm
vcnt \xA6 NEON count set bits per byte \xA6 vcnt.8 Dd, Dm
`);
function decompose(base) {
  const cond2 = base.slice(-2);
  const tries = [{ key: base, s: false }];
  if (CONDITIONS[cond2]) {
    const rest = base.slice(0, -2);
    tries.push({ key: rest, s: false, cond: cond2 });
    if (rest.endsWith("s")) tries.push({ key: rest.slice(0, -1), s: true, cond: cond2 });
  }
  if (base.endsWith("s")) tries.push({ key: base.slice(0, -1), s: true });
  const preUal = base.slice(-3, -1);
  if (base.endsWith("s") && CONDITIONS[preUal]) tries.push({ key: base.slice(0, -3), s: true, cond: preUal });
  return tries.find((t) => INSTR.has(t.key));
}
var QUALIFIER = {
  w: ".w: force the 32-bit Thumb-2 encoding",
  n: ".n: force the 16-bit Thumb encoding",
  f16: ".f16: half-precision float",
  f32: ".f32: single-precision float",
  f64: ".f64: double-precision float"
};
function describeInstr(word) {
  const w = word.toLowerCase();
  const [base, ...quals] = w.split(".");
  const notes = [];
  let e;
  const it = /^it([te]{0,3})$/.exec(base);
  if (it) {
    e = INSTR.get("it");
    if (it[1]) notes.push(`Block: 1st on cond, then ${it[1].split("").map((c) => c === "t" ? "then (cond)" : "else (!cond)").join(", ")}`);
  } else {
    const d = decompose(base);
    if (!d) return void 0;
    e = INSTR.get(d.key);
    if (d.s) notes.push("S: updates the N, Z, C, V flags");
    if (d.cond) notes.push(`Executes only if ${CONDITIONS[d.cond]}`);
  }
  for (const q of quals) {
    if (QUALIFIER[q]) notes.push(QUALIFIER[q]);
    else if (/^[siup]?\d+$/.test(q)) notes.push(`.${q}: ${q[0] === "s" ? "signed " : q[0] === "u" ? "unsigned " : q[0] === "i" ? "integer " : ""}${q.replace(/^\D/, "")}-bit elements`);
  }
  return e && { title: word, tag: "ARM AArch32 instruction", ...e, ...notes.length ? { notes } : {} };
}
var CORE = [
  [["r0", "a1"], "Argument 1 / return value (AAPCS, caller-saved); syscall return on Linux"],
  [["r1", "a2"], "Argument 2 / high word of a 64-bit return value (caller-saved)"],
  [["r2", "a3"], "Argument 3 (caller-saved)"],
  [["r3", "a4"], "Argument 4 (caller-saved)"],
  [["r4", "v1"], "Callee-saved variable register"],
  [["r5", "v2"], "Callee-saved variable register"],
  [["r6", "v3"], "Callee-saved variable register"],
  [["r7", "v4"], "Callee-saved; frame pointer in Thumb code; syscall number in the Linux EABI"],
  [["r8", "v5"], "Callee-saved variable register"],
  [["r9", "v6", "sb"], "Platform register (static base / TLS), otherwise callee-saved"],
  [["r10", "v7", "sl"], "Callee-saved (historically the stack limit)"],
  [["r11", "v8", "fp"], "Callee-saved; frame pointer in ARM (A32) code"],
  [["r12", "ip"], "Intra-procedure-call scratch, used by linker veneers (caller-saved)"],
  [["r13", "sp"], "Stack pointer. On Cortex-M it is banked: MSP or PSP, chosen by mode and CONTROL.SPSEL"],
  [["r14", "lr"], "Link register: return address after bl/blx. In a Cortex-M exception handler it holds EXC_RETURN (e.g. 0xFFFFFFFD = return to thread mode on PSP)"],
  [["r15", "pc"], "Program counter (reads as current instruction + 8 in A32, + 4 in Thumb)"]
];
var SPECIAL = docTable(`
cpsr \xA6 Current program status register: N Z C V Q flags, GE, I/F interrupt masks, T (Thumb), M[4:0] processor mode
spsr \xA6 Saved program status register: CPSR of the interrupted code, restored on exception return
apsr \xA6 Application program status register: N Z C V Q (and GE) flags
fpscr \xA6 Floating-point status and control: N Z C V compare flags, rounding mode, exception flags
msp \xA6 Main stack pointer (Cortex-M): used by exception handlers, and by thread mode when CONTROL.SPSEL = 0. Reset loads it from vector table entry 0
psp \xA6 Process stack pointer (Cortex-M): used in thread mode when CONTROL.SPSEL = 1; an RTOS gives each task its own PSP and swaps it in PendSV
primask \xA6 Priority mask (Cortex-M): 1 masks every exception with configurable priority (all but NMI and HardFault). Set by cpsid i
faultmask \xA6 Fault mask (Cortex-M, v7-M+): 1 also masks HardFault, only NMI can preempt. Set by cpsid f
basepri \xA6 Base priority mask (Cortex-M, v7-M+): masks exceptions whose priority value is \u2265 BASEPRI (lower urgency); 0 disables masking. Used by RTOS critical sections
basepri_max \xA6 Conditional write to BASEPRI (Cortex-M): only takes effect if it raises the masking level
control \xA6 CONTROL (Cortex-M): bit 0 nPRIV (thread mode unprivileged), bit 1 SPSEL (thread mode uses PSP), bit 2 FPCA (FP context active). Follow writes with isb
xpsr \xA6 Combined program status register (Cortex-M): APSR + IPSR + EPSR; the top word of the 8-word exception stack frame (r0\u2013r3, r12, lr, pc, xPSR)
ipsr \xA6 Interrupt program status register (Cortex-M): number of the exception being handled (0 = thread mode, 2 NMI, 3 HardFault, 11 SVCall, 14 PendSV, 15 SysTick, 16+ external IRQ n\u221216)
epsr \xA6 Execution program status register (Cortex-M): Thumb bit and IT/ICI state
iapsr eapsr iepsr \xA6 Combined views of IPSR/EPSR/APSR (Cortex-M)
msplim psplim \xA6 Stack limit registers (ARMv8-M): a stack overflow below the limit raises a fault
`);
function describeRegister(word) {
  const w = word.toLowerCase();
  const psr = /^(cpsr|spsr|apsr)_(\w+)$/.exec(w);
  const key = psr ? psr[1] : w;
  for (const [names, summary] of CORE) {
    if (names.includes(key)) {
      const alias = names.filter((n) => n !== key).join(" = ");
      return { title: word, tag: "ARM AArch32 register", summary: `${key}${alias ? ` = ${alias}` : ""}. ${summary}` };
    }
  }
  const special = SPECIAL.get(key);
  if (special) {
    return {
      title: word,
      tag: "ARM special register",
      ...special,
      ...psr ? { notes: [`_${psr[2]}: write only these fields (f flags, s status, x extension, c control; nzcvq = flags)`] } : {}
    };
  }
  let m = /^s(\d+)$/.exec(key);
  if (m && Number(m[1]) <= 31) {
    return { title: word, tag: "ARM VFP register", summary: `Single-precision register, overlaps the ${Number(m[1]) % 2 ? "upper" : "lower"} half of d${Math.floor(Number(m[1]) / 2)}. s0\u2013s15 are arguments/scratch, s16\u2013s31 callee-saved` };
  }
  m = /^d(\d+)$/.exec(key);
  if (m && Number(m[1]) <= 31) {
    const n = Number(m[1]);
    return { title: word, tag: "ARM VFP/NEON register", summary: `Double-precision / 64-bit vector register${n < 16 ? ` = s${2 * n}:s${2 * n + 1}` : ""}, half of q${n >> 1}. d0\u2013d7 arguments/scratch, d8\u2013d15 callee-saved` };
  }
  m = /^q(\d+)$/.exec(key);
  if (m && Number(m[1]) <= 15) {
    const n = Number(m[1]);
    return { title: word, tag: "ARM NEON register", summary: `128-bit vector register = d${2 * n}:d${2 * n + 1}. q4\u2013q7 are callee-saved` };
  }
  return void 0;
}
var SPECIAL_NAMES = [...SPECIAL.keys()];
function describeArm32(text, kind) {
  if (kind === "mnemonic") return describeInstr(text);
  if (kind === "register") return describeRegister(text);
  return void 0;
}

// src/isa/common.ts
var COND = ["eq", "ne", "cs", "hs", "cc", "lo", "mi", "pl", "vs", "vc", "hi", "ls", "ge", "lt", "gt", "le", "al"];
var COND_SET = new Set(COND);
function range(prefix, from, to) {
  const out = [];
  for (let i = from; i <= to; i++) out.push(prefix + i);
  return out;
}
function words(s) {
  return s.trim().split(/\s+/);
}
function isRegister(registers, word) {
  return registers.has(word.replace(/\.(\d*[bhsdq]|t)$/, "").replace(/^(apsr|cpsr|spsr)_[a-z]+$/, "$1"));
}

// src/isa/arm32.ts
var MNEMONICS = new Set(words(`
  adc add adr and asr b bfc bfi bic bkpt bl blx bx bxj cbnz cbz clrex clz cmn cmp cps cpsid cpsie
  dmb dsb eor isb ldm ldmia ldmib ldmda ldmdb ldmfd ldr ldrb ldrd ldrex ldrexb ldrexh ldrexd ldrh ldrsb ldrsh ldrt
  lsl lsr mcr mla mls mov movt movw mrc mrs msr mul mvn neg nop orn orr pkhbt pop push
  qadd qsub rbit rev rev16 revsh ror rrx rsb rsc sbc sbfx sdiv sev smlal smull ssat
  stm stmia stmea stmib stmda stmdb stmfd str strb strd strex strexb strexh strexd strh strt sub svc swi swp
  sxtb sxth tbb tbh teq tst ubfx udf udiv umlal umull usat uxtb uxth wfe wfi yield
  vabs vadd vcmp vcvt vdiv vdup vext vld1 vld2 vld3 vld4 vldm vldr vmla vmls vmov vmrs vmsr
  vmul vneg vpop vpush vsqrt vst1 vst2 vst3 vst4 vstm vstr vsub vand vorr veor vbic
  vmax vmin vshl vshr vqadd vqsub vtbl vzip vuzp vtrn vrev64 vcnt
`));
var REGISTERS = /* @__PURE__ */ new Set([
  ...range("r", 0, 15),
  "sp",
  "lr",
  "pc",
  "fp",
  "ip",
  "sb",
  "sl",
  ...range("s", 0, 31),
  ...range("d", 0, 31),
  ...range("q", 0, 15),
  ...SPECIAL_NAMES
]);
function isArm32Mnemonic(word) {
  const base = word.split(".")[0];
  if (/^it[te]{0,3}$/.test(base)) return true;
  const candidates = [base];
  if (COND_SET.has(base.slice(-2))) candidates.push(base.slice(0, -2));
  for (const c of [...candidates]) if (c.endsWith("s")) candidates.push(c.slice(0, -1));
  if (base.endsWith("s") && COND_SET.has(base.slice(-3, -1))) candidates.push(base.slice(0, -3));
  return candidates.some((c) => MNEMONICS.has(c));
}
var ARM32 = {
  id: "arm32",
  name: "ARM",
  aliases: ["arm", "thumb"],
  isMnemonic: isArm32Mnemonic,
  registers: REGISTERS,
  lineComments: ["@", "//", ";"],
  hashIsImmediate: true,
  describe: describeArm32
};

// src/docs/arm64.ts
var INSTR2 = docTable(`
adc adcs \xA6 Add with carry (adcs also sets NZCV) \xA6 adc Rd, Rn, Rm \xA6 Rd = Rn + Rm + C
add adds \xA6 Add (adds also sets NZCV) \xA6 add Rd, Rn, Op2 \xA6 Rd = Rn + Op2
adr \xA6 PC-relative address, \xB11 MiB \xA6 adr Xd, label \xA6 Xd = address of label
adrp \xA6 PC-relative 4 KiB page address, \xB14 GiB; pair with add Xd, Xd, :lo12:sym \xA6 adrp Xd, sym \xA6 Xd = (PC & ~0xFFF) + page_offset(sym)
and ands \xA6 Bitwise AND (ands also sets NZCV) \xA6 and Rd, Rn, Op2 \xA6 Rd = Rn & Op2
asr \xA6 Arithmetic shift right \xA6 asr Rd, Rn, #n / Rm \xA6 Rd = Rn >>s n
at \xA6 Address translate: run a translation and put the result in PAR_EL1 \xA6 at s1e1r, Xt
autia autiasp \xA6 Authenticate a pointer signed with key A (pointer authentication); autiasp checks LR against SP \xA6 autia Xd, Xn
b \xA6 Branch, \xB1128 MiB \xA6 b label \xA6 PC = label
b.cond \xA6 Conditional branch, \xB11 MiB \xA6 b.<cond> label \xA6 if (cond) PC = label
bc.cond bc \xA6 Branch consistent conditionally (FEAT_HBC): a hint that the branch rarely changes direction \xA6 bc.<cond> label \xA6 if (cond) PC = label
bfi \xA6 Bit field insert \xA6 bfi Rd, Rn, #lsb, #width \xA6 Rd[lsb+width-1:lsb] = Rn[width-1:0]
bfm \xA6 Bit field move (base of bfi/bfxil) \xA6 bfm Rd, Rn, #immr, #imms
bfxil \xA6 Bit field extract and insert low \xA6 bfxil Rd, Rn, #lsb, #width \xA6 Rd[width-1:0] = Rn[lsb+width-1:lsb]
bic bics \xA6 Bit clear (bics also sets NZCV) \xA6 bic Rd, Rn, Op2 \xA6 Rd = Rn & ~Op2
bl \xA6 Branch with link (function call), \xB1128 MiB \xA6 bl label \xA6 X30 = return address; PC = label
blr \xA6 Branch with link to register (indirect call) \xA6 blr Xn \xA6 X30 = return address; PC = Xn
br \xA6 Branch to register \xA6 br Xn \xA6 PC = Xn
brk \xA6 Breakpoint exception \xA6 brk #imm16
bti \xA6 Branch target identification landing pad \xA6 bti {c, j, jc}
cbnz \xA6 Compare and branch if non-zero \xA6 cbnz Rt, label \xA6 if (Rt != 0) PC = label
cbz \xA6 Compare and branch if zero \xA6 cbz Rt, label \xA6 if (Rt == 0) PC = label
ccmn \xA6 Conditional compare negative \xA6 ccmn Rn, Op2, #nzcv, cond \xA6 flags = cond ? flags(Rn + Op2) : #nzcv
ccmp \xA6 Conditional compare, for chaining conditions (a && b) \xA6 ccmp Rn, Op2, #nzcv, cond \xA6 flags = cond ? flags(Rn - Op2) : #nzcv
cinc \xA6 Conditional increment \xA6 cinc Rd, Rn, cond \xA6 Rd = cond ? Rn + 1 : Rn
cinv \xA6 Conditional invert \xA6 cinv Rd, Rn, cond \xA6 Rd = cond ? ~Rn : Rn
cneg \xA6 Conditional negate \xA6 cneg Rd, Rn, cond \xA6 Rd = cond ? -Rn : Rn
clrex \xA6 Clear the local exclusive monitor \xA6 clrex
cls \xA6 Count leading sign bits \xA6 cls Rd, Rn
clz \xA6 Count leading zeros \xA6 clz Rd, Rn
cmn \xA6 Compare negative (alias of adds with zero register) \xA6 cmn Rn, Op2 \xA6 flags = Rn + Op2
cmp \xA6 Compare (alias of subs with zero register) \xA6 cmp Rn, Op2 \xA6 flags = Rn - Op2
crc32b crc32h crc32w crc32x \xA6 CRC-32 of a byte / halfword / word / doubleword \xA6 crc32b Wd, Wn, Wm
csdb \xA6 Consumption of speculative data barrier (Spectre mitigation) \xA6 csdb
csel \xA6 Conditional select \xA6 csel Rd, Rn, Rm, cond \xA6 Rd = cond ? Rn : Rm
cset \xA6 Conditional set \xA6 cset Rd, cond \xA6 Rd = cond ? 1 : 0
csetm \xA6 Conditional set mask \xA6 csetm Rd, cond \xA6 Rd = cond ? -1 : 0
csinc \xA6 Conditional select increment \xA6 csinc Rd, Rn, Rm, cond \xA6 Rd = cond ? Rn : Rm + 1
csinv \xA6 Conditional select invert \xA6 csinv Rd, Rn, Rm, cond \xA6 Rd = cond ? Rn : ~Rm
csneg \xA6 Conditional select negate \xA6 csneg Rd, Rn, Rm, cond \xA6 Rd = cond ? Rn : -Rm
dc \xA6 Data cache maintenance by VA or set/way (e.g. civac clean+invalidate to PoC, cvau clean to PoU, zva zero a block) \xA6 dc civac, Xt
dmb \xA6 Data memory barrier: orders memory accesses (ish = inner shareable, ld/st variants) \xA6 dmb ish
dsb \xA6 Data synchronization barrier: waits for memory accesses and maintenance (TLBI, DC) to complete \xA6 dsb ish
eon \xA6 Exclusive OR NOT \xA6 eon Rd, Rn, Op2 \xA6 Rd = Rn ^ ~Op2
eor \xA6 Exclusive OR \xA6 eor Rd, Rn, Op2 \xA6 Rd = Rn ^ Op2
eret \xA6 Exception return: restores PSTATE from SPSR_ELx and jumps to ELR_ELx (also how a kernel drops to EL0) \xA6 eret \xA6 PC = ELR_ELx; PSTATE = SPSR_ELx
esb \xA6 Error synchronization barrier \xA6 esb
extr \xA6 Extract a register from a pair \xA6 extr Rd, Rn, Rm, #lsb \xA6 Rd = (Rn:Rm)[lsb+N-1:lsb]
hint \xA6 Hint instruction (nop, yield, wfe, ... by number) \xA6 hint #imm
hlt \xA6 Halting debug breakpoint \xA6 hlt #imm16
hvc \xA6 Hypervisor call: synchronous exception to EL2 \xA6 hvc #imm16
ic \xA6 Instruction cache maintenance (e.g. ic iallu, ic ivau, Xt after writing code) \xA6 ic ivau, Xt
isb \xA6 Instruction synchronization barrier: later instructions see the effects of earlier system register writes \xA6 isb
ldapr \xA6 Load-acquire RCpc register \xA6 ldapr Rt, [Xn]
ldar ldarb ldarh \xA6 Load-acquire: no later access can be observed before it \xA6 ldar Rt, [Xn]
ldaxr ldaxp \xA6 Load-acquire exclusive (register / pair), for lock acquire loops \xA6 ldaxr Rt, [Xn]
ldnp \xA6 Load pair, non-temporal hint \xA6 ldnp Rt1, Rt2, [Xn, #off]
ldp \xA6 Load pair (e.g. restore frame: ldp x29, x30, [sp], #16) \xA6 ldp Rt1, Rt2, [Xn, #off]{!} \xA6 Rt1 = M[a]; Rt2 = M[a + size]
ldpsw \xA6 Load pair of signed words \xA6 ldpsw Xt1, Xt2, [Xn, #off]
ldr \xA6 Load register; ldr Xt, =value is a literal-pool pseudo-instruction \xA6 ldr Rt, [Xn, #off]{!} / ldr Rt, [Xn], #off / ldr Rt, label \xA6 Rt = M[address]
ldrb ldrh \xA6 Load byte / halfword, zero-extended \xA6 ldrb Wt, [Xn, #off]
ldrsb ldrsh ldrsw \xA6 Load byte / halfword / word, sign-extended \xA6 ldrsw Xt, [Xn, #off]
ldur ldurb ldurh ldursb ldursh ldursw \xA6 Load with unscaled (byte) offset, \u2212256..255 \xA6 ldur Rt, [Xn, #simm9]
ldxr ldxp \xA6 Load exclusive (register / pair): starts a load-linked/store-conditional sequence \xA6 ldxr Rt, [Xn]
lsl \xA6 Logical shift left \xA6 lsl Rd, Rn, #n / Rm \xA6 Rd = Rn << n
lsr \xA6 Logical shift right \xA6 lsr Rd, Rn, #n / Rm \xA6 Rd = Rn >>u n
madd \xA6 Multiply-add \xA6 madd Rd, Rn, Rm, Ra \xA6 Rd = Ra + Rn \xD7 Rm
mneg \xA6 Multiply-negate \xA6 mneg Rd, Rn, Rm \xA6 Rd = -(Rn \xD7 Rm)
mov \xA6 Move register or immediate (alias of orr / movz / movn / add with sp) \xA6 mov Rd, Rn / #imm \xA6 Rd = Op
movk \xA6 Move 16-bit immediate, keeping other bits \xA6 movk Rd, #imm16{, lsl #s} \xA6 Rd[s+15:s] = imm16
movn \xA6 Move inverted 16-bit immediate \xA6 movn Rd, #imm16{, lsl #s} \xA6 Rd = ~(imm16 << s)
movz \xA6 Move 16-bit immediate, zeroing other bits \xA6 movz Rd, #imm16{, lsl #s} \xA6 Rd = imm16 << s
mrs \xA6 Read a system register \xA6 mrs Xt, sysreg \xA6 Xt = sysreg
msr \xA6 Write a system register, or a PSTATE field with an immediate (msr daifset, #2 masks IRQs) \xA6 msr sysreg, Xt / msr pstatefield, #imm \xA6 sysreg = Xt
msub \xA6 Multiply-subtract \xA6 msub Rd, Rn, Rm, Ra \xA6 Rd = Ra - Rn \xD7 Rm
mul \xA6 Multiply \xA6 mul Rd, Rn, Rm \xA6 Rd = Rn \xD7 Rm
mvn \xA6 Bitwise NOT \xA6 mvn Rd, Op2 \xA6 Rd = ~Op2
neg negs \xA6 Negate (negs also sets NZCV) \xA6 neg Rd, Op2 \xA6 Rd = 0 - Op2
ngc ngcs \xA6 Negate with carry \xA6 ngc Rd, Rm \xA6 Rd = 0 - Rm - !C
nop \xA6 No operation \xA6 nop
orn \xA6 OR NOT \xA6 orn Rd, Rn, Op2 \xA6 Rd = Rn | ~Op2
orr \xA6 Bitwise OR \xA6 orr Rd, Rn, Op2 \xA6 Rd = Rn | Op2
pacia paciasp \xA6 Sign a pointer with key A (pointer authentication); paciasp signs LR using SP \xA6 pacia Xd, Xn
prfm \xA6 Prefetch memory hint \xA6 prfm pldl1keep, [Xn, #off]
rbit \xA6 Reverse bit order \xA6 rbit Rd, Rn
ret \xA6 Return from subroutine (default register X30) \xA6 ret {Xn} \xA6 PC = X30
retaa \xA6 Return with pointer authentication (key A, modifier SP) \xA6 retaa
rev \xA6 Reverse byte order (endianness swap) \xA6 rev Rd, Rn
rev16 rev32 \xA6 Reverse bytes within each halfword / word \xA6 rev16 Rd, Rn
ror \xA6 Rotate right \xA6 ror Rd, Rn, #n / Rm \xA6 Rd = Rn rotr n
sbc sbcs \xA6 Subtract with carry \xA6 sbc Rd, Rn, Rm \xA6 Rd = Rn - Rm - !C
sbfiz \xA6 Signed bit field insert in zeros \xA6 sbfiz Rd, Rn, #lsb, #width
sbfm \xA6 Signed bit field move (base of asr / sbfx / sxt*) \xA6 sbfm Rd, Rn, #immr, #imms
sbfx \xA6 Signed bit field extract \xA6 sbfx Rd, Rn, #lsb, #width \xA6 Rd = sext(Rn[lsb+width-1:lsb])
sdiv \xA6 Signed divide (divide by zero gives 0, no trap) \xA6 sdiv Rd, Rn, Rm \xA6 Rd = Rn /s Rm
sev sevl \xA6 Send event (sevl: to this PE only) \xA6 sev
smaddl \xA6 Signed multiply-add long \xA6 smaddl Xd, Wn, Wm, Xa \xA6 Xd = Xa + Wn \xD7s Wm
smc \xA6 Secure monitor call: synchronous exception to EL3 (e.g. PSCI) \xA6 smc #imm16
smnegl smsubl \xA6 Signed multiply-negate / multiply-subtract long \xA6 smsubl Xd, Wn, Wm, Xa
smulh \xA6 Signed multiply high: upper 64 bits of a 128-bit product \xA6 smulh Xd, Xn, Xm
smull \xA6 Signed multiply long \xA6 smull Xd, Wn, Wm \xA6 Xd = Wn \xD7s Wm
stlr stlrb stlrh \xA6 Store-release: no earlier access can be observed after it \xA6 stlr Rt, [Xn]
stlxr stlxp \xA6 Store-release exclusive; status register is 0 on success \xA6 stlxr Ws, Rt, [Xn]
stnp \xA6 Store pair, non-temporal hint \xA6 stnp Rt1, Rt2, [Xn, #off]
stp \xA6 Store pair (e.g. save frame: stp x29, x30, [sp, #-16]!) \xA6 stp Rt1, Rt2, [Xn, #off]{!} \xA6 M[a] = Rt1; M[a + size] = Rt2
str \xA6 Store register \xA6 str Rt, [Xn, #off]{!} / str Rt, [Xn], #off \xA6 M[address] = Rt
strb strh \xA6 Store byte / halfword \xA6 strb Wt, [Xn, #off]
stur sturb sturh \xA6 Store with unscaled (byte) offset \xA6 stur Rt, [Xn, #simm9]
stxr stxp \xA6 Store exclusive; status register is 0 on success, 1 if the monitor was lost \xA6 stxr Ws, Rt, [Xn]
sub subs \xA6 Subtract (subs also sets NZCV) \xA6 sub Rd, Rn, Op2 \xA6 Rd = Rn - Op2
svc \xA6 Supervisor call: synchronous exception to EL1 (system call; Linux passes the number in x8) \xA6 svc #imm16
sxtb sxth sxtw \xA6 Sign-extend byte / halfword / word \xA6 sxtw Xd, Wn
sys sysl \xA6 Generic system instruction (DC, IC, AT, TLBI are aliases) \xA6 sys #op1, Cn, Cm, #op2, Xt
tbnz \xA6 Test bit and branch if non-zero \xA6 tbnz Rt, #bit, label \xA6 if (Rt[bit] == 1) PC = label
tbz \xA6 Test bit and branch if zero \xA6 tbz Rt, #bit, label \xA6 if (Rt[bit] == 0) PC = label
tlbi \xA6 TLB invalidate (e.g. tlbi vmalle1is, tlbi vae1, Xt); follow with dsb + isb \xA6 tlbi op{, Xt}
tst \xA6 Test bits (alias of ands with zero register) \xA6 tst Rn, Op2 \xA6 flags = Rn & Op2
ubfiz \xA6 Unsigned bit field insert in zeros \xA6 ubfiz Rd, Rn, #lsb, #width
ubfm \xA6 Unsigned bit field move (base of lsl / lsr / ubfx / uxt*) \xA6 ubfm Rd, Rn, #immr, #imms
ubfx \xA6 Unsigned bit field extract \xA6 ubfx Rd, Rn, #lsb, #width \xA6 Rd = zext(Rn[lsb+width-1:lsb])
udf \xA6 Permanently undefined \xA6 udf #imm16
udiv \xA6 Unsigned divide (divide by zero gives 0) \xA6 udiv Rd, Rn, Rm \xA6 Rd = Rn /u Rm
umaddl \xA6 Unsigned multiply-add long \xA6 umaddl Xd, Wn, Wm, Xa \xA6 Xd = Xa + Wn \xD7u Wm
umnegl umsubl \xA6 Unsigned multiply-negate / multiply-subtract long \xA6 umsubl Xd, Wn, Wm, Xa
umulh \xA6 Unsigned multiply high: upper 64 bits of a 128-bit product \xA6 umulh Xd, Xn, Xm
umull \xA6 Unsigned multiply long \xA6 umull Xd, Wn, Wm \xA6 Xd = Wn \xD7u Wm
uxtb uxth \xA6 Zero-extend byte / halfword \xA6 uxtb Wd, Wn
wfe \xA6 Wait for event (low-power spin-lock waiting) \xA6 wfe
wfi \xA6 Wait for interrupt (idle loop) \xA6 wfi
yield \xA6 Hint that the thread is spinning \xA6 yield
fabs \xA6 FP absolute value \xA6 fabs Dd, Dn
fadd \xA6 FP add \xA6 fadd Dd, Dn, Dm \xA6 Dd = Dn + Dm
fcmp fcmpe \xA6 FP compare, sets NZCV (fcmpe also signals on quiet NaN) \xA6 fcmp Dn, Dm / #0.0
fcsel \xA6 FP conditional select \xA6 fcsel Dd, Dn, Dm, cond \xA6 Dd = cond ? Dn : Dm
fcvt \xA6 FP convert between precisions \xA6 fcvt Dd, Sn
fcvtzs fcvtzu \xA6 FP to signed / unsigned integer, rounding toward zero \xA6 fcvtzs Xd, Dn
fdiv \xA6 FP divide \xA6 fdiv Dd, Dn, Dm \xA6 Dd = Dn / Dm
fmadd \xA6 FP fused multiply-add \xA6 fmadd Dd, Dn, Dm, Da \xA6 Dd = Da + Dn \xD7 Dm
fmsub \xA6 FP fused multiply-subtract \xA6 fmsub Dd, Dn, Dm, Da \xA6 Dd = Da - Dn \xD7 Dm
fmax fmin \xA6 FP maximum / minimum \xA6 fmax Dd, Dn, Dm
fmov \xA6 FP move register, immediate, or bits to/from a general register \xA6 fmov Dd, Xn / fmov Dd, #imm
fmul \xA6 FP multiply \xA6 fmul Dd, Dn, Dm \xA6 Dd = Dn \xD7 Dm
fneg \xA6 FP negate \xA6 fneg Dd, Dn
fnmadd fnmsub fnmul \xA6 FP negated multiply-add / multiply-subtract / multiply \xA6 fnmul Dd, Dn, Dm
frinta frintm frintn frintp frintx frintz \xA6 FP round to integral (a away, m \u2212\u221E, n even, p +\u221E, x current mode exact, z toward zero) \xA6 frintz Dd, Dn
fsqrt \xA6 FP square root \xA6 fsqrt Dd, Dn
fsub \xA6 FP subtract \xA6 fsub Dd, Dn, Dm \xA6 Dd = Dn - Dm
scvtf ucvtf \xA6 Signed / unsigned integer to FP \xA6 scvtf Dd, Xn
ld1 ld2 ld3 ld4 \xA6 SIMD load with 1\u20134-way de-interleave \xA6 ld1 {v0.4s}, [x0]
st1 st2 st3 st4 \xA6 SIMD store with 1\u20134-way interleave \xA6 st1 {v0.4s}, [x0]
dup \xA6 SIMD duplicate an element or register into all lanes \xA6 dup v0.4s, w1
ins \xA6 SIMD insert an element \xA6 ins v0.s[1], w1
umov smov \xA6 SIMD move an element to a general register (zero / sign extended) \xA6 umov w0, v1.s[0]
addv \xA6 SIMD add across lanes \xA6 addv s0, v1.4s
addp \xA6 SIMD add pairwise \xA6 addp v0.4s, v1.4s, v2.4s
cnt \xA6 SIMD count set bits per byte \xA6 cnt v0.8b, v1.8b
ext \xA6 SIMD extract a vector from a pair \xA6 ext v0.16b, v1.16b, v2.16b, #n
tbl tbx \xA6 SIMD table lookup (tbx keeps out-of-range lanes) \xA6 tbl v0.16b, {v1.16b}, v2.16b
zip1 zip2 uzp1 uzp2 trn1 trn2 \xA6 SIMD interleave / de-interleave / transpose \xA6 zip1 v0.4s, v1.4s, v2.4s
movi mvni \xA6 SIMD move (inverted) immediate \xA6 movi v0.16b, #0
xtn \xA6 SIMD extract narrow \xA6 xtn v0.4h, v1.4s
uaddlv saddlv \xA6 SIMD add long across lanes \xA6 uaddlv h0, v1.16b
cas casa casl casal \xA6 Compare and swap (LSE atomics; a = acquire, l = release) \xA6 cas Ws, Wt, [Xn] \xA6 atomically: if (M[Xn] == Ws) M[Xn] = Wt; Ws = old
ldadd ldadda ldaddl ldaddal \xA6 Atomic add (LSE; a = acquire, l = release) \xA6 ldadd Ws, Wt, [Xn] \xA6 atomically: Wt = M[Xn]; M[Xn] += Ws
swp swpa swpl swpal \xA6 Atomic swap (LSE; a = acquire, l = release) \xA6 swp Ws, Wt, [Xn] \xA6 atomically: Wt = M[Xn]; M[Xn] = Ws
`);
var SYSREGS = docTable(`
nzcv \xA6 Condition flags N Z C V (bits 31:28)
fpcr \xA6 Floating-point control: rounding mode, flush-to-zero, default NaN, trap enables
fpsr \xA6 Floating-point status: cumulative exception flags
daif \xA6 Interrupt masks D (debug), A (SError), I (IRQ), F (FIQ) in bits 9:6
daifset \xA6 Set DAIF mask bits with an immediate: msr daifset, #2 masks IRQs (#0b1111 masks all)
daifclr \xA6 Clear DAIF mask bits with an immediate: msr daifclr, #2 unmasks IRQs
spsel \xA6 Stack pointer select: 0 = use SP_EL0 at the current EL, 1 = use SP_ELx
currentel \xA6 Current exception level in bits 3:2 (read-only)
sp_el0 \xA6 Stack pointer for EL0 (user stack, saved/restored on context switch)
sp_el1 \xA6 Stack pointer for EL1 (kernel)
sp_el2 \xA6 Stack pointer for EL2 (hypervisor)
elr_el1 elr_el2 elr_el3 \xA6 Exception link register: return address used by eret
spsr_el1 spsr_el2 spsr_el3 \xA6 Saved program status: PSTATE at exception entry (M[3:0] = EL and SP, DAIF, NZCV), restored by eret
esr_el1 esr_el2 esr_el3 \xA6 Exception syndrome: EC[31:26] class (0x15 SVC from AArch64, 0x20/0x21 instruction abort, 0x24/0x25 data abort, 0x3C BRK), IL, ISS details
far_el1 far_el2 far_el3 \xA6 Fault address register: virtual address of an instruction/data abort
vbar_el1 vbar_el2 vbar_el3 \xA6 Vector base address: 2 KiB-aligned table of 16 entries \xD7 0x80 (current EL SP0 / SPx, lower EL AArch64 / AArch32 \xD7 sync / IRQ / FIQ / SError)
sctlr_el1 sctlr_el2 sctlr_el3 \xA6 System control: M(0) MMU enable, A(1) alignment check, C(2) data cache, SA(3) stack alignment, I(12) instruction cache, WXN(19), EE(25) endianness
tcr_el1 tcr_el2 tcr_el3 \xA6 Translation control: T0SZ/T1SZ address sizes, TG0/TG1 granule (4/16/64 KiB), cacheability and shareability of table walks, IPS physical address size
ttbr0_el1 ttbr0_el2 ttbr0_el3 \xA6 Translation table base 0: root table for the lower VA range (user space at EL1), with ASID in the top bits
ttbr1_el1 ttbr1_el2 \xA6 Translation table base 1: root table for the upper VA range (kernel space)
mair_el1 mair_el2 mair_el3 \xA6 Memory attribute indirection: 8 attribute bytes (e.g. 0x00 Device-nGnRnE, 0xFF Normal write-back) indexed by AttrIndx in page table entries
amair_el1 \xA6 Auxiliary memory attribute indirection (implementation defined)
tpidr_el0 \xA6 Thread ID register, EL0 read/write (user TLS pointer)
tpidrro_el0 \xA6 Thread ID register, read-only at EL0
tpidr_el1 tpidr_el2 tpidr_el3 \xA6 Thread ID register for the EL (kernels keep per-CPU data here)
contextidr_el1 \xA6 Context ID (current process ID for debug/trace)
cpacr_el1 \xA6 Architectural feature access control: FPEN (bits 21:20) enables FP/SIMD at EL0/EL1
cptr_el2 cptr_el3 \xA6 Architectural feature trap register (FP/SIMD, SVE traps)
actlr_el1 \xA6 Auxiliary control (implementation defined)
mdscr_el1 \xA6 Monitor debug system control
par_el1 \xA6 Physical address register: result of an AT instruction
mpidr_el1 \xA6 Multiprocessor affinity: Aff3/Aff2/Aff1/Aff0 identify the core (read-only)
midr_el1 \xA6 Main ID: implementer, variant, part number, revision (read-only)
id_aa64pfr0_el1 \xA6 Processor feature register 0: supported ELs, FP, SIMD, GIC system registers
id_aa64mmfr0_el1 \xA6 Memory model feature register 0: PA range, supported granules, ASID size
id_aa64isar0_el1 \xA6 Instruction set attribute register 0: AES, SHA, CRC32, atomics
hcr_el2 \xA6 Hypervisor configuration: VM(0) stage-2 translation, IMO/FMO route IRQ/FIQ to EL2, RW(31) EL1 is AArch64, TGE
vttbr_el2 \xA6 Stage-2 translation table base (with VMID)
vtcr_el2 \xA6 Stage-2 translation control
hpfar_el2 \xA6 Hypervisor IPA fault address
scr_el3 \xA6 Secure configuration: NS(0) non-secure, IRQ/FIQ/EA routing to EL3, RW(10) lower EL is AArch64
cntfrq_el0 \xA6 Generic timer frequency in Hz (set by firmware)
cntpct_el0 \xA6 Physical count: 64-bit system counter
cntvct_el0 \xA6 Virtual count: system counter minus CNTVOFF_EL2
cntp_ctl_el0 cntv_ctl_el0 \xA6 Physical / virtual timer control: ENABLE(0), IMASK(1), ISTATUS(2)
cntp_cval_el0 cntv_cval_el0 \xA6 Physical / virtual timer compare value: fires when the count \u2265 CVAL
cntp_tval_el0 cntv_tval_el0 \xA6 Physical / virtual timer value: down-counter view, fires at 0 (write ticks-until-interrupt)
cntkctl_el1 \xA6 Counter-timer kernel control: EL0 access to the counters and timers
cnthctl_el2 \xA6 Counter-timer hypervisor control
cntvoff_el2 \xA6 Counter-timer virtual offset
icc_iar1_el1 \xA6 GICv3 interrupt acknowledge (group 1): read to get the pending INTID (1020\u20131023 = spurious)
icc_eoir1_el1 \xA6 GICv3 end of interrupt (group 1): write the INTID when done
icc_dir_el1 \xA6 GICv3 deactivate interrupt (when EOImode = 1)
icc_pmr_el1 \xA6 GICv3 priority mask: only interrupts with priority value lower than this are signalled
icc_bpr1_el1 \xA6 GICv3 binary point (group 1): splits priority into preemption group and subpriority
icc_ctlr_el1 \xA6 GICv3 CPU interface control
icc_sre_el1 \xA6 GICv3 system register enable: SRE(0) = use system registers instead of MMIO
icc_igrpen1_el1 \xA6 GICv3 enable group 1 interrupts
icc_sgi1r_el1 \xA6 GICv3 generate a software-generated interrupt (IPI) to other cores
`);
var GP = (n) => n <= 7 ? "Argument / result register (AAPCS64, caller-saved)" : n === 8 ? "Indirect result location (caller-saved); syscall number on Linux" : n <= 15 ? "Temporary (caller-saved)" : n <= 17 ? `IP${n - 16}: intra-procedure-call scratch, used by veneers and PLT stubs` : n === 18 ? "Platform register (reserved on some OSes), otherwise temporary" : n <= 28 ? "Callee-saved" : n === 29 ? "Frame pointer (FP, callee-saved)" : "Link register (LR): return address after bl/blr";
var VIEWS = { b: "8-bit", h: "16-bit", s: "32-bit", d: "64-bit", q: "128-bit" };
function describeRegister2(word) {
  const raw = word.toLowerCase();
  const arrangement = /\.(\d*[bhsdq])$/.exec(raw);
  const w = arrangement ? raw.slice(0, -arrangement[0].length) : raw;
  const reg = (tag, summary, notes) => ({ title: word, tag, summary, ...notes ? { notes } : {} });
  let m = /^([xw])(\d+)$/.exec(w);
  if (m && Number(m[2]) <= 30) {
    const n = Number(m[2]);
    return m[1] === "x" ? reg("ARM AArch64 register", `x${n}. ${GP(n)}`) : reg("ARM AArch64 register", `w${n}: low 32 bits of x${n} (writing it zeroes the upper half). ${GP(n)}`);
  }
  if (w === "lr") return reg("ARM AArch64 register", `lr = x30. ${GP(30)}`);
  if (w === "fp") return reg("ARM AArch64 register", `fp = x29. ${GP(29)}`);
  if (w === "sp" || w === "wsp") return reg("ARM AArch64 register", "Stack pointer, 16-byte aligned when used for memory access; the current EL's SP_ELx (or SP_EL0 when SPSel = 0)");
  if (w === "xzr" || w === "wzr") return reg("ARM AArch64 register", "Zero register: reads 0, writes are discarded (same encoding as sp, chosen by instruction)");
  m = /^([vqdshb])(\d+)$/.exec(w);
  if (m && Number(m[2]) <= 31) {
    const n = Number(m[2]);
    const abi = n <= 7 ? "argument / result (caller-saved)" : n <= 15 ? "callee-saved (low 64 bits only)" : "temporary (caller-saved)";
    const notes = arrangement ? [`.${arrangement[1]}: ${arrangement[1].replace(/^(\d+)(\w)$/, (_, c, t) => `${c} lanes of ${VIEWS[t]}`).replace(/^([bhsdq])$/, (t) => `one ${VIEWS[t]} element`)}`] : void 0;
    return m[1] === "v" ? reg("ARM SIMD/FP register", `v${n}: 128-bit SIMD & FP register, ${abi}`, notes) : reg("ARM SIMD/FP register", `${m[1]}${n}: ${VIEWS[m[1]]} view of v${n}, ${abi}`);
  }
  const sys = SYSREGS.get(w);
  return sys && reg("ARM system register", sys.summary);
}
function describeInstr2(word) {
  const w = word.toLowerCase();
  const cond = /^(b|bc)\.(\w+)$/.exec(w);
  if (cond && CONDITIONS[cond[2]]) {
    const e2 = INSTR2.get(`${cond[1]}.cond`);
    return { title: word, tag: "ARM AArch64 instruction", ...e2, notes: [`Branches if ${CONDITIONS[cond[2]]}`] };
  }
  const e = INSTR2.get(w);
  return e && { title: word, tag: "ARM AArch64 instruction", ...e };
}
var SYSREG_NAMES = [...SYSREGS.keys()];
function describeArm64(text, kind) {
  if (kind === "mnemonic") return describeInstr2(text);
  if (kind === "register") return describeRegister2(text);
  return void 0;
}

// src/isa/arm64.ts
var MNEMONICS2 = new Set(words(`
  adc adcs add adds adr adrp and ands asr at autia autiasp b bc bfi bfm bfxil bic bics bl blr br brk bti
  cbnz cbz ccmn ccmp cinc cinv clrex cls clz cmn cmp cneg crc32b crc32h crc32w crc32x
  csdb csel cset csetm csinc csinv csneg dc dmb dsb eon eor eret esb extr hint hlt hvc ic isb
  ldapr ldar ldarb ldarh ldaxr ldaxp ldnp ldp ldpsw ldr ldrb ldrh ldrsb ldrsh ldrsw
  ldur ldurb ldurh ldursb ldursh ldursw ldxr ldxp lsl lsr madd mneg mov movk movn movz
  mrs msr msub mul mvn neg negs ngc ngcs nop orn orr pacia paciasp prfm rbit ret retaa
  rev rev16 rev32 ror sbc sbcs sbfiz sbfm sbfx sdiv sev sevl smaddl smc smnegl smsubl smulh smull
  stlr stlrb stlrh stlxr stlxp stnp stp str strb strh stur sturb sturh stxr stxp sub subs svc
  sxtb sxth sxtw sys sysl tbnz tbz tlbi tst ubfiz ubfm ubfx udf udiv umaddl umnegl umsubl umulh umull
  uxtb uxth wfe wfi yield
  fabs fadd fcmp fcmpe fcsel fcvt fcvtzs fcvtzu fdiv fmadd fmax fmin fmov fmsub fmul fneg
  fnmadd fnmsub fnmul frinta frintm frintn frintp frintx frintz fsqrt fsub scvtf ucvtf
  ld1 ld2 ld3 ld4 st1 st2 st3 st4 dup ins umov smov addv addp cnt ext tbl tbx
  zip1 zip2 uzp1 uzp2 trn1 trn2 movi mvni xtn uaddlv saddlv
  cas casa casal casl ldadd ldadda ldaddal ldaddl swp swpa swpal swpl
`));
var REGISTERS2 = /* @__PURE__ */ new Set([
  ...range("x", 0, 30),
  ...range("w", 0, 30),
  "sp",
  "wsp",
  "xzr",
  "wzr",
  "lr",
  "fp",
  ...range("v", 0, 31),
  ...range("q", 0, 31),
  ...range("d", 0, 31),
  ...range("s", 0, 31),
  ...range("h", 0, 31),
  ...range("b", 0, 31),
  ...SYSREG_NAMES
]);
function isArm64Mnemonic(word) {
  if (MNEMONICS2.has(word)) return true;
  const [base, suffix] = word.split(".");
  return (base === "b" || base === "bc") && suffix !== void 0 && COND_SET.has(suffix);
}
var ARM64 = {
  id: "arm64",
  name: "AArch64",
  aliases: ["aarch64", "a64"],
  isMnemonic: isArm64Mnemonic,
  registers: REGISTERS2,
  lineComments: ["//", ";"],
  hashIsImmediate: true,
  describe: describeArm64
};

// src/docs/riscv.ts
var INSTR3 = docTable(`
lui \xA6 Load upper immediate \xA6 lui rd, imm20 \xA6 rd = sext(imm20 << 12)
auipc \xA6 Add upper immediate to PC \xA6 auipc rd, imm20 \xA6 rd = pc + sext(imm20 << 12)
jal \xA6 Jump and link (\xB11 MiB) \xA6 jal rd, offset \xA6 rd = pc + 4; pc += sext(offset)
jalr \xA6 Jump and link register \xA6 jalr rd, offset(rs1) \xA6 t = pc + 4; pc = (rs1 + sext(offset)) & ~1; rd = t
beq \xA6 Branch if equal \xA6 beq rs1, rs2, offset \xA6 if (rs1 == rs2) pc += sext(offset)
bne \xA6 Branch if not equal \xA6 bne rs1, rs2, offset \xA6 if (rs1 != rs2) pc += sext(offset)
blt \xA6 Branch if less than (signed) \xA6 blt rs1, rs2, offset \xA6 if (rs1 <s rs2) pc += sext(offset)
bge \xA6 Branch if greater or equal (signed) \xA6 bge rs1, rs2, offset \xA6 if (rs1 >=s rs2) pc += sext(offset)
bltu \xA6 Branch if less than (unsigned) \xA6 bltu rs1, rs2, offset \xA6 if (rs1 <u rs2) pc += sext(offset)
bgeu \xA6 Branch if greater or equal (unsigned) \xA6 bgeu rs1, rs2, offset \xA6 if (rs1 >=u rs2) pc += sext(offset)
lb \xA6 Load byte, sign-extended \xA6 lb rd, offset(rs1) \xA6 rd = sext(M8[rs1 + sext(offset)])
lh \xA6 Load halfword, sign-extended \xA6 lh rd, offset(rs1) \xA6 rd = sext(M16[rs1 + sext(offset)])
lw \xA6 Load word (sign-extended on RV64) \xA6 lw rd, offset(rs1) \xA6 rd = sext(M32[rs1 + sext(offset)])
lbu \xA6 Load byte, zero-extended \xA6 lbu rd, offset(rs1) \xA6 rd = zext(M8[rs1 + sext(offset)])
lhu \xA6 Load halfword, zero-extended \xA6 lhu rd, offset(rs1) \xA6 rd = zext(M16[rs1 + sext(offset)])
lwu \xA6 Load word, zero-extended (RV64) \xA6 lwu rd, offset(rs1) \xA6 rd = zext(M32[rs1 + sext(offset)])
ld \xA6 Load doubleword (RV64) \xA6 ld rd, offset(rs1) \xA6 rd = M64[rs1 + sext(offset)]
sb \xA6 Store byte \xA6 sb rs2, offset(rs1) \xA6 M8[rs1 + sext(offset)] = rs2[7:0]
sh \xA6 Store halfword \xA6 sh rs2, offset(rs1) \xA6 M16[rs1 + sext(offset)] = rs2[15:0]
sw \xA6 Store word \xA6 sw rs2, offset(rs1) \xA6 M32[rs1 + sext(offset)] = rs2[31:0]
sd \xA6 Store doubleword (RV64) \xA6 sd rs2, offset(rs1) \xA6 M64[rs1 + sext(offset)] = rs2
addi \xA6 Add immediate \xA6 addi rd, rs1, imm12 \xA6 rd = rs1 + sext(imm12)
slti \xA6 Set if less than immediate (signed) \xA6 slti rd, rs1, imm12 \xA6 rd = (rs1 <s sext(imm12)) ? 1 : 0
sltiu \xA6 Set if less than immediate (unsigned compare) \xA6 sltiu rd, rs1, imm12 \xA6 rd = (rs1 <u sext(imm12)) ? 1 : 0
xori \xA6 XOR immediate \xA6 xori rd, rs1, imm12 \xA6 rd = rs1 ^ sext(imm12)
ori \xA6 OR immediate \xA6 ori rd, rs1, imm12 \xA6 rd = rs1 | sext(imm12)
andi \xA6 AND immediate \xA6 andi rd, rs1, imm12 \xA6 rd = rs1 & sext(imm12)
slli \xA6 Shift left logical immediate \xA6 slli rd, rs1, shamt \xA6 rd = rs1 << shamt
srli \xA6 Shift right logical immediate \xA6 srli rd, rs1, shamt \xA6 rd = rs1 >>u shamt
srai \xA6 Shift right arithmetic immediate \xA6 srai rd, rs1, shamt \xA6 rd = rs1 >>s shamt
add \xA6 Add \xA6 add rd, rs1, rs2 \xA6 rd = rs1 + rs2
sub \xA6 Subtract \xA6 sub rd, rs1, rs2 \xA6 rd = rs1 - rs2
sll \xA6 Shift left logical \xA6 sll rd, rs1, rs2 \xA6 rd = rs1 << rs2[log2(XLEN)-1:0]
slt \xA6 Set if less than (signed) \xA6 slt rd, rs1, rs2 \xA6 rd = (rs1 <s rs2) ? 1 : 0
sltu \xA6 Set if less than (unsigned) \xA6 sltu rd, rs1, rs2 \xA6 rd = (rs1 <u rs2) ? 1 : 0
xor \xA6 Exclusive OR \xA6 xor rd, rs1, rs2 \xA6 rd = rs1 ^ rs2
srl \xA6 Shift right logical \xA6 srl rd, rs1, rs2 \xA6 rd = rs1 >>u rs2[log2(XLEN)-1:0]
sra \xA6 Shift right arithmetic \xA6 sra rd, rs1, rs2 \xA6 rd = rs1 >>s rs2[log2(XLEN)-1:0]
or \xA6 OR \xA6 or rd, rs1, rs2 \xA6 rd = rs1 | rs2
and \xA6 AND \xA6 and rd, rs1, rs2 \xA6 rd = rs1 & rs2
fence \xA6 Memory ordering fence: accesses in pred complete before accesses in succ (i/o = device input/output, r/w = memory) \xA6 fence pred, succ \xA6 e.g. fence rw, rw = full barrier
fence.i \xA6 Instruction fence (Zifencei): later instruction fetches see earlier stores, needed after writing code \xA6 fence.i
fence.tso \xA6 Total-store-order fence (orders all but store\u2192load) \xA6 fence.tso
ecall \xA6 Environment call: traps to the next privilege level (system call, or SBI call from S-mode) \xA6 ecall \xA6 mcause/scause = 8 (from U), 9 (from S), 11 (from M)
ebreak \xA6 Breakpoint exception (cause 3) \xA6 ebreak
addiw \xA6 Add immediate word (RV64) \xA6 addiw rd, rs1, imm12 \xA6 rd = sext((rs1 + sext(imm12))[31:0])
slliw \xA6 Shift left logical immediate word (RV64) \xA6 slliw rd, rs1, shamt \xA6 rd = sext((rs1 << shamt)[31:0])
srliw \xA6 Shift right logical immediate word (RV64) \xA6 srliw rd, rs1, shamt \xA6 rd = sext(rs1[31:0] >>u shamt)
sraiw \xA6 Shift right arithmetic immediate word (RV64) \xA6 sraiw rd, rs1, shamt \xA6 rd = sext(rs1[31:0] >>s shamt)
addw \xA6 Add word (RV64) \xA6 addw rd, rs1, rs2 \xA6 rd = sext((rs1 + rs2)[31:0])
subw \xA6 Subtract word (RV64) \xA6 subw rd, rs1, rs2 \xA6 rd = sext((rs1 - rs2)[31:0])
sllw \xA6 Shift left logical word (RV64) \xA6 sllw rd, rs1, rs2 \xA6 rd = sext((rs1 << rs2[4:0])[31:0])
srlw \xA6 Shift right logical word (RV64) \xA6 srlw rd, rs1, rs2 \xA6 rd = sext(rs1[31:0] >>u rs2[4:0])
sraw \xA6 Shift right arithmetic word (RV64) \xA6 sraw rd, rs1, rs2 \xA6 rd = sext(rs1[31:0] >>s rs2[4:0])
mul \xA6 Multiply, low XLEN bits (M) \xA6 mul rd, rs1, rs2 \xA6 rd = (rs1 \xD7 rs2)[XLEN-1:0]
mulh \xA6 Multiply high, signed \xD7 signed (M) \xA6 mulh rd, rs1, rs2 \xA6 rd = (rs1 \xD7s rs2) >> XLEN
mulhsu \xA6 Multiply high, signed \xD7 unsigned (M) \xA6 mulhsu rd, rs1, rs2 \xA6 rd = (rs1 \xD7s rs2 unsigned) >> XLEN
mulhu \xA6 Multiply high, unsigned \xD7 unsigned (M) \xA6 mulhu rd, rs1, rs2 \xA6 rd = (rs1 \xD7u rs2) >> XLEN
div \xA6 Divide, signed (M); divide by zero gives -1, no trap \xA6 div rd, rs1, rs2 \xA6 rd = rs1 /s rs2
divu \xA6 Divide, unsigned (M); divide by zero gives all ones \xA6 divu rd, rs1, rs2 \xA6 rd = rs1 /u rs2
rem \xA6 Remainder, signed (M); by zero gives rs1 \xA6 rem rd, rs1, rs2 \xA6 rd = rs1 %s rs2
remu \xA6 Remainder, unsigned (M); by zero gives rs1 \xA6 remu rd, rs1, rs2 \xA6 rd = rs1 %u rs2
mulw \xA6 Multiply word (RV64 M) \xA6 mulw rd, rs1, rs2 \xA6 rd = sext((rs1 \xD7 rs2)[31:0])
divw \xA6 Divide word, signed (RV64 M) \xA6 divw rd, rs1, rs2 \xA6 rd = sext(rs1[31:0] /s rs2[31:0])
divuw \xA6 Divide word, unsigned (RV64 M) \xA6 divuw rd, rs1, rs2 \xA6 rd = sext(rs1[31:0] /u rs2[31:0])
remw \xA6 Remainder word, signed (RV64 M) \xA6 remw rd, rs1, rs2 \xA6 rd = sext(rs1[31:0] %s rs2[31:0])
remuw \xA6 Remainder word, unsigned (RV64 M) \xA6 remuw rd, rs1, rs2 \xA6 rd = sext(rs1[31:0] %u rs2[31:0])
lr \xA6 Load-reserved (A): loads and registers a reservation on the address \xA6 lr.{w,d} rd, (rs1) \xA6 rd = M[rs1]; reserve(rs1)
sc \xA6 Store-conditional (A): stores only if the reservation still holds \xA6 sc.{w,d} rd, rs2, (rs1) \xA6 if reserved(rs1) { M[rs1] = rs2; rd = 0 } else rd = nonzero
amoswap \xA6 Atomic swap (A) \xA6 amoswap.{w,d} rd, rs2, (rs1) \xA6 atomically: rd = M[rs1]; M[rs1] = rs2
amoadd \xA6 Atomic add (A) \xA6 amoadd.{w,d} rd, rs2, (rs1) \xA6 atomically: rd = M[rs1]; M[rs1] = rd + rs2
amoxor \xA6 Atomic XOR (A) \xA6 amoxor.{w,d} rd, rs2, (rs1) \xA6 atomically: rd = M[rs1]; M[rs1] = rd ^ rs2
amoand \xA6 Atomic AND (A) \xA6 amoand.{w,d} rd, rs2, (rs1) \xA6 atomically: rd = M[rs1]; M[rs1] = rd & rs2
amoor \xA6 Atomic OR (A) \xA6 amoor.{w,d} rd, rs2, (rs1) \xA6 atomically: rd = M[rs1]; M[rs1] = rd | rs2
amomin \xA6 Atomic minimum, signed (A) \xA6 amomin.{w,d} rd, rs2, (rs1) \xA6 atomically: rd = M[rs1]; M[rs1] = min_s(rd, rs2)
amomax \xA6 Atomic maximum, signed (A) \xA6 amomax.{w,d} rd, rs2, (rs1) \xA6 atomically: rd = M[rs1]; M[rs1] = max_s(rd, rs2)
amominu \xA6 Atomic minimum, unsigned (A) \xA6 amominu.{w,d} rd, rs2, (rs1) \xA6 atomically: rd = M[rs1]; M[rs1] = min_u(rd, rs2)
amomaxu \xA6 Atomic maximum, unsigned (A) \xA6 amomaxu.{w,d} rd, rs2, (rs1) \xA6 atomically: rd = M[rs1]; M[rs1] = max_u(rd, rs2)
csrrw \xA6 Atomic read/write CSR (Zicsr) \xA6 csrrw rd, csr, rs1 \xA6 t = CSR; CSR = rs1; rd = t (no read side effects if rd = x0)
csrrs \xA6 Atomic read and set bits in CSR (Zicsr) \xA6 csrrs rd, csr, rs1 \xA6 t = CSR; CSR = t | rs1; rd = t
csrrc \xA6 Atomic read and clear bits in CSR (Zicsr) \xA6 csrrc rd, csr, rs1 \xA6 t = CSR; CSR = t & ~rs1; rd = t
csrrwi \xA6 Atomic read/write CSR, immediate (Zicsr) \xA6 csrrwi rd, csr, uimm5 \xA6 t = CSR; CSR = zext(uimm5); rd = t
csrrsi \xA6 Atomic read and set bits in CSR, immediate (Zicsr) \xA6 csrrsi rd, csr, uimm5 \xA6 t = CSR; CSR = t | zext(uimm5); rd = t
csrrci \xA6 Atomic read and clear bits in CSR, immediate (Zicsr) \xA6 csrrci rd, csr, uimm5 \xA6 t = CSR; CSR = t & ~zext(uimm5); rd = t
mret \xA6 Return from machine-mode trap \xA6 mret \xA6 pc = mepc; priv = mstatus.MPP; mstatus.MIE = MPIE; MPIE = 1; MPP = U (or least privileged)
sret \xA6 Return from supervisor-mode trap \xA6 sret \xA6 pc = sepc; priv = sstatus.SPP; sstatus.SIE = SPIE; SPIE = 1; SPP = U
wfi \xA6 Wait for interrupt: hint to stall the hart until an interrupt is pending (may be a no-op) \xA6 wfi
sfence.vma \xA6 Supervisor fence for virtual memory: flush TLB entries after changing page tables or satp \xA6 sfence.vma rs1, rs2 \xA6 rs1 = virtual address (x0 = all), rs2 = ASID (x0 = all)
flw \xA6 Load single-precision float (F) \xA6 flw rd, offset(rs1) \xA6 f[rd] = M32[rs1 + sext(offset)]
fsw \xA6 Store single-precision float (F) \xA6 fsw rs2, offset(rs1) \xA6 M32[rs1 + sext(offset)] = f[rs2]
fld \xA6 Load double-precision float (D) \xA6 fld rd, offset(rs1) \xA6 f[rd] = M64[rs1 + sext(offset)]
fsd \xA6 Store double-precision float (D) \xA6 fsd rs2, offset(rs1) \xA6 M64[rs1 + sext(offset)] = f[rs2]
flh \xA6 Load half-precision float (Zfh) \xA6 flh rd, offset(rs1) \xA6 f[rd] = M16[rs1 + sext(offset)]
fsh \xA6 Store half-precision float (Zfh) \xA6 fsh rs2, offset(rs1) \xA6 M16[rs1 + sext(offset)] = f[rs2]
flq \xA6 Load quad-precision float (Q) \xA6 flq rd, offset(rs1) \xA6 f[rd] = M128[rs1 + sext(offset)]
fsq \xA6 Store quad-precision float (Q) \xA6 fsq rs2, offset(rs1) \xA6 M128[rs1 + sext(offset)] = f[rs2]
fadd \xA6 Floating-point add \xA6 fadd.{s,d,h,q} rd, rs1, rs2 \xA6 rd = rs1 + rs2
fsub \xA6 Floating-point subtract \xA6 fsub.{s,d,h,q} rd, rs1, rs2 \xA6 rd = rs1 - rs2
fmul \xA6 Floating-point multiply \xA6 fmul.{s,d,h,q} rd, rs1, rs2 \xA6 rd = rs1 \xD7 rs2
fdiv \xA6 Floating-point divide \xA6 fdiv.{s,d,h,q} rd, rs1, rs2 \xA6 rd = rs1 / rs2
fsqrt \xA6 Floating-point square root \xA6 fsqrt.{s,d,h,q} rd, rs1 \xA6 rd = \u221Ars1
fmin \xA6 Floating-point minimum \xA6 fmin.{s,d,h,q} rd, rs1, rs2 \xA6 rd = min(rs1, rs2)
fmax \xA6 Floating-point maximum \xA6 fmax.{s,d,h,q} rd, rs1, rs2 \xA6 rd = max(rs1, rs2)
fmadd \xA6 Fused multiply-add \xA6 fmadd.{s,d} rd, rs1, rs2, rs3 \xA6 rd = rs1 \xD7 rs2 + rs3
fmsub \xA6 Fused multiply-subtract \xA6 fmsub.{s,d} rd, rs1, rs2, rs3 \xA6 rd = rs1 \xD7 rs2 - rs3
fnmadd \xA6 Fused negated multiply-add \xA6 fnmadd.{s,d} rd, rs1, rs2, rs3 \xA6 rd = -(rs1 \xD7 rs2) - rs3
fnmsub \xA6 Fused negated multiply-subtract \xA6 fnmsub.{s,d} rd, rs1, rs2, rs3 \xA6 rd = -(rs1 \xD7 rs2) + rs3
fcvt \xA6 Convert between integer and floating-point formats: fcvt.<to>.<from> \xA6 fcvt.w.s rd, fs1 / fcvt.s.w fd, rs1 \xA6 e.g. fcvt.w.s: int32 = (int)float, fcvt.d.s: double = float
fmv \xA6 Move raw bits between integer and FP registers: fmv.x.w (FP\u2192int), fmv.w.x (int\u2192FP) \xA6 fmv.x.{w,d} rd, fs1 / fmv.{w,d}.x fd, rs1 \xA6 bit pattern copied unchanged
fsgnj \xA6 Sign injection: magnitude of rs1, sign of rs2 (fmv.s is fsgnj.s rd, rs, rs) \xA6 fsgnj.{s,d} rd, rs1, rs2 \xA6 rd = {rs2.sign, rs1[exp,frac]}
fsgnjn \xA6 Sign injection, negated (fneg.s is fsgnjn.s rd, rs, rs) \xA6 fsgnjn.{s,d} rd, rs1, rs2 \xA6 rd = {!rs2.sign, rs1[exp,frac]}
fsgnjx \xA6 Sign injection, XOR (fabs.s is fsgnjx.s rd, rs, rs) \xA6 fsgnjx.{s,d} rd, rs1, rs2 \xA6 rd = {rs1.sign ^ rs2.sign, rs1[exp,frac]}
feq \xA6 Floating-point compare equal (result in integer register) \xA6 feq.{s,d} rd, fs1, fs2 \xA6 rd = (fs1 == fs2) ? 1 : 0
flt \xA6 Floating-point compare less than \xA6 flt.{s,d} rd, fs1, fs2 \xA6 rd = (fs1 < fs2) ? 1 : 0
fle \xA6 Floating-point compare less or equal \xA6 fle.{s,d} rd, fs1, fs2 \xA6 rd = (fs1 <= fs2) ? 1 : 0
fclass \xA6 Classify float into a 10-bit one-hot mask (\u2212\u221E, normal, subnormal, \xB10, NaN, ...) \xA6 fclass.{s,d} rd, fs1
fneg \xA6 Floating-point negate (pseudo for fsgnjn) \xA6 fneg.{s,d} rd, rs \xA6 rd = -rs
fabs \xA6 Floating-point absolute value (pseudo for fsgnjx) \xA6 fabs.{s,d} rd, rs \xA6 rd = |rs|
fli \xA6 Load floating-point constant from a fixed table (Zfa) \xA6 fli.{s,d} rd, constant
sh1add \xA6 Shift left by 1 and add (Zba) \xA6 sh1add rd, rs1, rs2 \xA6 rd = rs2 + (rs1 << 1)
sh2add \xA6 Shift left by 2 and add (Zba), e.g. indexing a word array \xA6 sh2add rd, rs1, rs2 \xA6 rd = rs2 + (rs1 << 2)
sh3add \xA6 Shift left by 3 and add (Zba), e.g. indexing a doubleword array \xA6 sh3add rd, rs1, rs2 \xA6 rd = rs2 + (rs1 << 3)
andn \xA6 AND with inverted operand (Zbb) \xA6 andn rd, rs1, rs2 \xA6 rd = rs1 & ~rs2
orn \xA6 OR with inverted operand (Zbb) \xA6 orn rd, rs1, rs2 \xA6 rd = rs1 | ~rs2
xnor \xA6 Exclusive NOR (Zbb) \xA6 xnor rd, rs1, rs2 \xA6 rd = ~(rs1 ^ rs2)
clz \xA6 Count leading zero bits (Zbb) \xA6 clz rd, rs1
ctz \xA6 Count trailing zero bits (Zbb) \xA6 ctz rd, rs1
cpop \xA6 Count set bits / population count (Zbb) \xA6 cpop rd, rs1
max \xA6 Maximum, signed (Zbb) \xA6 max rd, rs1, rs2 \xA6 rd = max_s(rs1, rs2)
maxu \xA6 Maximum, unsigned (Zbb) \xA6 maxu rd, rs1, rs2 \xA6 rd = max_u(rs1, rs2)
min \xA6 Minimum, signed (Zbb) \xA6 min rd, rs1, rs2 \xA6 rd = min_s(rs1, rs2)
minu \xA6 Minimum, unsigned (Zbb) \xA6 minu rd, rs1, rs2 \xA6 rd = min_u(rs1, rs2)
rol \xA6 Rotate left (Zbb) \xA6 rol rd, rs1, rs2 \xA6 rd = rs1 rotl rs2
ror \xA6 Rotate right (Zbb) \xA6 ror rd, rs1, rs2 \xA6 rd = rs1 rotr rs2
rori \xA6 Rotate right immediate (Zbb) \xA6 rori rd, rs1, shamt \xA6 rd = rs1 rotr shamt
rev8 \xA6 Reverse byte order (Zbb), endianness swap \xA6 rev8 rd, rs1
clzw ctzw cpopw \xA6 Word versions of clz/ctz/cpop on rs1[31:0] (RV64 Zbb) \xA6 clzw rd, rs1
rolw rorw roriw \xA6 Word rotates on rs1[31:0], result sign-extended (RV64 Zbb) \xA6 rolw rd, rs1, rs2
sext \xA6 Sign-extend: sext.b/sext.h (Zbb) or sext.w (pseudo for addiw rd, rs, 0) \xA6 sext.{b,h,w} rd, rs \xA6 rd = sext(rs[n-1:0])
zext \xA6 Zero-extend: zext.b (andi rd, rs, 255), zext.h (Zbb), zext.w (add.uw rd, rs, zero) \xA6 zext.{b,h,w} rd, rs \xA6 rd = zext(rs[n-1:0])
add.uw \xA6 Add unsigned word (Zba) \xA6 add.uw rd, rs1, rs2 \xA6 rd = rs2 + zext(rs1[31:0])
orc.b \xA6 OR-combine bytes (Zbb): each byte becomes 0x00 if zero else 0xFF, for fast strlen \xA6 orc.b rd, rs1
vsetvli \xA6 Set vector length and element type (V) \xA6 vsetvli rd, rs1, e32, m1, ta, ma \xA6 vl = min(AVL = rs1, VLMAX); rd = vl
vsetivli \xA6 Set vector length from a 5-bit immediate (V) \xA6 vsetivli rd, uimm5, e32, m1, ta, ma \xA6 vl = min(uimm5, VLMAX); rd = vl
vsetvl \xA6 Set vector length and type from registers (V) \xA6 vsetvl rd, rs1, rs2 \xA6 vtype = rs2; vl = min(rs1, VLMAX); rd = vl
vle8 vle16 vle32 vle64 \xA6 Unit-stride vector load (V) \xA6 vle<eew>.v vd, (rs1), v0.t \xA6 vd[i] = M[rs1 + i \xD7 eew/8]
vse8 vse16 vse32 vse64 \xA6 Unit-stride vector store (V) \xA6 vse<eew>.v vs3, (rs1), v0.t \xA6 M[rs1 + i \xD7 eew/8] = vs3[i]
vlse8 vlse16 vlse32 vlse64 \xA6 Strided vector load (V) \xA6 vlse<eew>.v vd, (rs1), rs2 \xA6 vd[i] = M[rs1 + i \xD7 rs2]
vadd \xA6 Vector add \xA6 vadd.vv vd, vs2, vs1 \xA6 vd[i] = vs2[i] + vs1[i]
vsub \xA6 Vector subtract \xA6 vsub.vv vd, vs2, vs1 \xA6 vd[i] = vs2[i] - vs1[i]
vrsub \xA6 Vector reverse subtract \xA6 vrsub.vx vd, vs2, rs1 \xA6 vd[i] = rs1 - vs2[i]
vmul \xA6 Vector multiply, low bits \xA6 vmul.vv vd, vs2, vs1 \xA6 vd[i] = vs2[i] \xD7 vs1[i]
vdiv vdivu \xA6 Vector divide (signed / unsigned) \xA6 vdiv.vv vd, vs2, vs1 \xA6 vd[i] = vs2[i] / vs1[i]
vrem \xA6 Vector remainder \xA6 vrem.vv vd, vs2, vs1 \xA6 vd[i] = vs2[i] % vs1[i]
vand vor vxor \xA6 Vector bitwise AND / OR / XOR \xA6 vand.vv vd, vs2, vs1 \xA6 vd[i] = vs2[i] op vs1[i]
vsll vsrl vsra \xA6 Vector shift left / right logical / right arithmetic \xA6 vsll.vv vd, vs2, vs1 \xA6 vd[i] = vs2[i] shift vs1[i]
vmin vmax \xA6 Vector signed minimum / maximum \xA6 vmin.vv vd, vs2, vs1
vmv \xA6 Vector move: vmv.v.v / .v.x / .v.i (splat), vmv.x.s (element 0 \u2192 x), vmv.s.x (x \u2192 element 0) \xA6 vmv.v.x vd, rs1
vmerge \xA6 Vector merge under mask v0 \xA6 vmerge.vvm vd, vs2, vs1, v0 \xA6 vd[i] = v0[i] ? vs1[i] : vs2[i]
vredsum \xA6 Vector sum reduction \xA6 vredsum.vs vd, vs2, vs1 \xA6 vd[0] = vs1[0] + \u03A3 vs2[i]
vredmax vredmin \xA6 Vector max / min reduction \xA6 vredmax.vs vd, vs2, vs1 \xA6 vd[0] = max(vs1[0], vs2[*])
vmacc \xA6 Vector multiply-accumulate \xA6 vmacc.vv vd, vs1, vs2 \xA6 vd[i] += vs1[i] \xD7 vs2[i]
vnmsac \xA6 Vector negated multiply-subtract-accumulate \xA6 vnmsac.vv vd, vs1, vs2 \xA6 vd[i] -= vs1[i] \xD7 vs2[i]
vslideup \xA6 Slide elements up by an offset \xA6 vslideup.vx vd, vs2, rs1 \xA6 vd[i + rs1] = vs2[i]
vslidedown \xA6 Slide elements down by an offset \xA6 vslidedown.vx vd, vs2, rs1 \xA6 vd[i] = vs2[i + rs1]
vrgather \xA6 Vector register gather (permute) \xA6 vrgather.vv vd, vs2, vs1 \xA6 vd[i] = vs2[vs1[i]]
vmseq vmsne vmslt vmsltu vmsle vmsleu vmsgt vmsgtu \xA6 Vector compare, writes a mask register \xA6 vmslt.vv vd, vs2, vs1 \xA6 vd.mask[i] = vs2[i] cmp vs1[i]
vfadd vfsub vfmul vfdiv \xA6 Vector floating-point add / subtract / multiply / divide \xA6 vfadd.vv vd, vs2, vs1 \xA6 vd[i] = vs2[i] op vs1[i]
vfmacc \xA6 Vector floating-point multiply-accumulate \xA6 vfmacc.vv vd, vs1, vs2 \xA6 vd[i] += vs1[i] \xD7 vs2[i]
vfmin vfmax \xA6 Vector floating-point minimum / maximum \xA6 vfmin.vv vd, vs2, vs1
vfmv \xA6 Vector floating-point move (vfmv.v.f splat, vfmv.f.s, vfmv.s.f) \xA6 vfmv.v.f vd, fs1
vfcvt \xA6 Vector floating-point / integer conversion \xA6 vfcvt.x.f.v vd, vs2
vfredosum \xA6 Vector floating-point ordered sum reduction \xA6 vfredosum.vs vd, vs2, vs1
vfredusum \xA6 Vector floating-point unordered sum reduction \xA6 vfredusum.vs vd, vs2, vs1
nop \xA6 No operation (pseudo) \xA6 nop \xA6 addi x0, x0, 0
li \xA6 Load immediate (pseudo; expands to lui/addi or longer sequences) \xA6 li rd, imm \xA6 rd = imm
la \xA6 Load address (pseudo): auipc + addi, or a GOT load in PIC code \xA6 la rd, symbol \xA6 rd = &symbol
lla \xA6 Load local address (pseudo, always PC-relative) \xA6 lla rd, symbol \xA6 auipc rd, %pcrel_hi(sym); addi rd, rd, %pcrel_lo(sym)
mv \xA6 Copy register (pseudo) \xA6 mv rd, rs \xA6 addi rd, rs, 0
not \xA6 Bitwise NOT (pseudo) \xA6 not rd, rs \xA6 xori rd, rs, -1
neg \xA6 Negate (pseudo) \xA6 neg rd, rs \xA6 sub rd, x0, rs
negw \xA6 Negate word (RV64 pseudo) \xA6 negw rd, rs \xA6 subw rd, x0, rs
seqz \xA6 Set if equal to zero (pseudo) \xA6 seqz rd, rs \xA6 sltiu rd, rs, 1
snez \xA6 Set if not equal to zero (pseudo) \xA6 snez rd, rs \xA6 sltu rd, x0, rs
sltz \xA6 Set if less than zero (pseudo) \xA6 sltz rd, rs \xA6 slt rd, rs, x0
sgtz \xA6 Set if greater than zero (pseudo) \xA6 sgtz rd, rs \xA6 slt rd, x0, rs
beqz \xA6 Branch if zero (pseudo) \xA6 beqz rs, offset \xA6 beq rs, x0, offset
bnez \xA6 Branch if not zero (pseudo) \xA6 bnez rs, offset \xA6 bne rs, x0, offset
blez \xA6 Branch if \u2264 zero (pseudo) \xA6 blez rs, offset \xA6 bge x0, rs, offset
bgez \xA6 Branch if \u2265 zero (pseudo) \xA6 bgez rs, offset \xA6 bge rs, x0, offset
bltz \xA6 Branch if < zero (pseudo) \xA6 bltz rs, offset \xA6 blt rs, x0, offset
bgtz \xA6 Branch if > zero (pseudo) \xA6 bgtz rs, offset \xA6 blt x0, rs, offset
bgt \xA6 Branch if greater than, signed (pseudo) \xA6 bgt rs, rt, offset \xA6 blt rt, rs, offset
ble \xA6 Branch if less or equal, signed (pseudo) \xA6 ble rs, rt, offset \xA6 bge rt, rs, offset
bgtu \xA6 Branch if greater than, unsigned (pseudo) \xA6 bgtu rs, rt, offset \xA6 bltu rt, rs, offset
bleu \xA6 Branch if less or equal, unsigned (pseudo) \xA6 bleu rs, rt, offset \xA6 bgeu rt, rs, offset
j \xA6 Jump (pseudo) \xA6 j offset \xA6 jal x0, offset
jr \xA6 Jump to register (pseudo) \xA6 jr rs \xA6 jalr x0, 0(rs)
ret \xA6 Return from function (pseudo) \xA6 ret \xA6 jalr x0, 0(ra)
call \xA6 Call a function anywhere in \xB12 GiB (pseudo) \xA6 call symbol \xA6 auipc ra, %pcrel_hi(sym); jalr ra, %pcrel_lo(sym)(ra)
tail \xA6 Tail call (pseudo): jump without saving a return address \xA6 tail symbol \xA6 auipc t1, %pcrel_hi(sym); jalr x0, %pcrel_lo(sym)(t1)
csrr \xA6 Read CSR (pseudo) \xA6 csrr rd, csr \xA6 csrrs rd, csr, x0
csrw \xA6 Write CSR (pseudo) \xA6 csrw csr, rs \xA6 csrrw x0, csr, rs
csrs \xA6 Set bits in CSR (pseudo) \xA6 csrs csr, rs \xA6 csrrs x0, csr, rs
csrc \xA6 Clear bits in CSR (pseudo) \xA6 csrc csr, rs \xA6 csrrc x0, csr, rs
csrwi \xA6 Write CSR, immediate (pseudo) \xA6 csrwi csr, uimm5 \xA6 csrrwi x0, csr, uimm5
csrsi \xA6 Set bits in CSR, immediate (pseudo), e.g. csrsi mstatus, 8 enables MIE \xA6 csrsi csr, uimm5 \xA6 csrrsi x0, csr, uimm5
csrci \xA6 Clear bits in CSR, immediate (pseudo), e.g. csrci mstatus, 8 disables MIE \xA6 csrci csr, uimm5 \xA6 csrrci x0, csr, uimm5
rdcycle \xA6 Read cycle counter (pseudo) \xA6 rdcycle rd \xA6 csrrs rd, cycle, x0
rdtime \xA6 Read real-time counter (pseudo) \xA6 rdtime rd \xA6 csrrs rd, time, x0
rdinstret \xA6 Read retired-instruction counter (pseudo) \xA6 rdinstret rd \xA6 csrrs rd, instret, x0
rdcycleh rdtimeh rdinstreth \xA6 Read upper 32 bits of a counter (RV32 pseudo) \xA6 rdcycleh rd \xA6 csrrs rd, cycleh, x0
frcsr fscsr \xA6 Read / swap the FP control and status register (pseudo) \xA6 frcsr rd \xA6 csrrs rd, fcsr, x0
frrm fsrm \xA6 Read / swap the FP rounding mode (pseudo) \xA6 frrm rd \xA6 csrrs rd, frm, x0
frflags fsflags \xA6 Read / swap the FP exception flags (pseudo) \xA6 frflags rd \xA6 csrrs rd, fflags, x0
`);
var ORDERING = {
  aq: ".aq: acquire, no later access may be observed before this one",
  rl: ".rl: release, no earlier access may be observed after this one",
  aqrl: ".aqrl: acquire + release (sequentially consistent)"
};
var FP_SUFFIX = {
  s: ".s = single precision (32-bit float)",
  d: ".d = double precision (64-bit)",
  h: ".h = half precision (16-bit)",
  q: ".q = quad precision (128-bit)",
  w: ".w = 32-bit signed integer",
  wu: ".wu = 32-bit unsigned integer",
  l: ".l = 64-bit signed integer",
  lu: ".lu = 64-bit unsigned integer",
  x: ".x = integer register"
};
var V_SUFFIX = {
  vv: ".vv: vector-vector",
  vx: ".vx: vector-scalar (x register)",
  vi: ".vi: vector-immediate",
  vf: ".vf: vector-scalar (f register)",
  wv: ".wv: wide vector op narrow vector",
  wx: ".wx: wide vector op scalar",
  vvm: ".vvm: vector-vector under mask v0",
  vxm: ".vxm: vector-scalar under mask v0",
  vim: ".vim: vector-immediate under mask v0",
  vs: ".vs: reduction (vector into scalar element 0)",
  v: ".v: vector operand"
};
var C_BASE = {
  lwsp: ["lw", "sp-relative: lw rd, offset(sp)"],
  swsp: ["sw", "sp-relative: sw rs2, offset(sp)"],
  ldsp: ["ld", "sp-relative: ld rd, offset(sp)"],
  sdsp: ["sd", "sp-relative: sd rs2, offset(sp)"],
  flwsp: ["flw", "sp-relative"],
  fswsp: ["fsw", "sp-relative"],
  fldsp: ["fld", "sp-relative"],
  fsdsp: ["fsd", "sp-relative"],
  addi16sp: ["addi", "addi sp, sp, nzimm\xD716 (stack adjust)"],
  addi4spn: ["addi", "addi rd', sp, nzuimm\xD74 (address of a stack slot)"]
};
function describeInstr3(word) {
  var _a;
  let w = word.toLowerCase();
  const notes = [];
  const order = /^(.*)\.(aq|rl|aqrl)$/.exec(w);
  if (order) {
    w = order[1];
    notes.push(ORDERING[order[2]]);
  }
  let e = INSTR3.get(w);
  if (!e && w.startsWith("c.")) {
    const rest = w.slice(2);
    const mapped = C_BASE[rest];
    e = INSTR3.get(mapped ? mapped[0] : rest);
    notes.unshift("C extension: 16-bit compressed encoding; operands written x' are limited to x8\u2013x15");
    if (mapped) notes.push(mapped[1]);
  }
  if (!e) {
    const dot = w.indexOf(".");
    if (dot > 0) {
      const base = w.slice(0, dot);
      const parts = w.slice(dot + 1).split(".");
      e = INSTR3.get(base);
      if (e && base.startsWith("v")) {
        const suffix = (_a = V_SUFFIX[parts.join(".")]) != null ? _a : V_SUFFIX[parts[parts.length - 1]];
        if (suffix) notes.push(suffix);
      } else if (e && (base === "lr" || base === "sc" || base.startsWith("amo"))) {
        if (parts[0] === "w") notes.unshift(".w: 32-bit word (sign-extended into rd on RV64)");
        if (parts[0] === "d") notes.unshift(".d: 64-bit doubleword (RV64)");
      } else if (e) {
        for (const p of parts) if (FP_SUFFIX[p]) notes.push(FP_SUFFIX[p]);
      }
    }
  }
  return e && { title: word, tag: "RISC-V instruction", ...withNotes(e, notes) };
}
function withNotes(e, notes) {
  return notes.length ? { ...e, notes } : { ...e };
}
var ABI = [
  ["zero", "Hard-wired zero: reads 0, writes are ignored"],
  ["ra", "Return address (caller-saved); set by jal/call"],
  ["sp", "Stack pointer (callee-saved), 16-byte aligned"],
  ["gp", "Global pointer, used for linker relaxation of nearby globals"],
  ["tp", "Thread pointer (thread-local storage; often the hart/CPU struct in kernels)"],
  ["t0", "Temporary (caller-saved); alternate link register"],
  ["t1", "Temporary (caller-saved)"],
  ["t2", "Temporary (caller-saved)"],
  ["s0", "Saved register / frame pointer fp (callee-saved)"],
  ["s1", "Saved register (callee-saved)"],
  ["a0", "Argument 0 / return value 0 (caller-saved); syscall return value"],
  ["a1", "Argument 1 / return value 1 (caller-saved)"],
  ...[2, 3, 4, 5, 6].map((i) => [`a${i}`, `Argument ${i} (caller-saved)`]),
  ["a7", "Argument 7 (caller-saved); syscall number on Linux, SBI extension ID"],
  ...[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => [`s${i}`, "Saved register (callee-saved)"]),
  ["t3", "Temporary (caller-saved)"],
  ["t4", "Temporary (caller-saved)"],
  ["t5", "Temporary (caller-saved)"],
  ["t6", "Temporary (caller-saved)"]
];
var FP_ABI = (i) => i <= 7 ? [`ft${i}`, "FP temporary (caller-saved)"] : i <= 9 ? [`fs${i - 8}`, "FP saved register (callee-saved)"] : i <= 17 ? [`fa${i - 10}`, i <= 11 ? "FP argument / return value (caller-saved)" : "FP argument (caller-saved)"] : i <= 27 ? [`fs${i - 16}`, "FP saved register (callee-saved)"] : [`ft${i - 20}`, "FP temporary (caller-saved)"];
var CSR = docTable(`
fflags \xA6 Floating-point accrued exception flags: NV DZ OF UF NX \xA6 0x001
frm \xA6 Floating-point dynamic rounding mode (0 RNE, 1 RTZ, 2 RDN, 3 RUP, 4 RMM) \xA6 0x002
fcsr \xA6 Floating-point control and status: frm[7:5] + fflags[4:0] \xA6 0x003
cycle \xA6 Cycle counter, read-only user view of mcycle \xA6 0xC00
time \xA6 Real-time counter, read-only view of the memory-mapped mtime \xA6 0xC01
instret \xA6 Instructions-retired counter, read-only view of minstret \xA6 0xC02
cycleh timeh instreth \xA6 Upper 32 bits of cycle / time / instret (RV32 only) \xA6 0xC80\u20130xC82
sstatus \xA6 Supervisor status, a restricted view of mstatus: SIE(1) S interrupt enable, SPIE(5) previous SIE, SPP(8) previous privilege (0 = U, 1 = S), FS(14:13), SUM(18) allow S access to U pages, MXR(19) \xA6 0x100
sie \xA6 Supervisor interrupt enable: SSIE(1) software, STIE(5) timer, SEIE(9) external \xA6 0x104
stvec \xA6 Supervisor trap vector: BASE (4-byte aligned) + MODE[1:0] (0 = direct, 1 = vectored: interrupts go to BASE + 4\xD7cause) \xA6 0x105
scounteren \xA6 Which counters (cycle, time, instret, ...) U-mode may read \xA6 0x106
senvcfg \xA6 Supervisor environment configuration \xA6 0x10A
sscratch \xA6 Scratch register for the S-mode trap handler; usually holds the kernel stack or per-hart data while in U-mode \xA6 0x140
sepc \xA6 Supervisor exception PC: address of the trapping/interrupted instruction; sret returns here (add 4 to skip an ecall) \xA6 0x141
scause \xA6 Supervisor trap cause: bit XLEN-1 set for interrupts (1 S-software, 5 S-timer, 9 S-external); exceptions 2 illegal instr, 3 breakpoint, 8 ecall from U, 12/13/15 instruction/load/store page fault \xA6 0x142
stval \xA6 Supervisor trap value: faulting address or illegal instruction bits \xA6 0x143
sip \xA6 Supervisor interrupt pending: SSIP(1), STIP(5), SEIP(9) \xA6 0x144
stimecmp \xA6 Supervisor timer compare (Sstc): S-timer interrupt pends when time \u2265 stimecmp \xA6 0x14D
satp \xA6 Supervisor address translation and protection: MODE (RV64 bits 63:60: 0 Bare, 8 Sv39, 9 Sv48, 10 Sv57; RV32 bit 31: Sv32), ASID, and PPN of the root page table. Follow writes with sfence.vma \xA6 0x180
mvendorid \xA6 Vendor ID (JEDEC), read-only \xA6 0xF11
marchid \xA6 Architecture ID, read-only \xA6 0xF12
mimpid \xA6 Implementation ID, read-only \xA6 0xF13
mhartid \xA6 ID of the hart running this code, read-only; hart 0 is often the boot hart \xA6 0xF14
mconfigptr \xA6 Pointer to the configuration data structure \xA6 0xF15
mstatus \xA6 Machine status: MIE(3) global M interrupt enable, MPIE(7) previous MIE, MPP(12:11) previous privilege (0 U, 1 S, 3 M), SIE(1), SPIE(5), SPP(8), FS(14:13) FPU state, MPRV(17), SUM(18), MXR(19), TVM(20), TW(21), TSR(22) \xA6 0x300
misa \xA6 ISA and extensions: MXL in the top 2 bits (1 = 32, 2 = 64), one bit per extension letter (bit 0 = A ... bit 25 = Z) \xA6 0x301
medeleg \xA6 Machine exception delegation: set bit n to handle exception n in S-mode \xA6 0x302
mideleg \xA6 Machine interrupt delegation: set bit n to handle interrupt n in S-mode \xA6 0x303
mie \xA6 Machine interrupt enable: MSIE(3) software, MTIE(7) timer, MEIE(11) external; SSIE(1), STIE(5), SEIE(9) \xA6 0x304
mtvec \xA6 Machine trap vector: BASE (4-byte aligned) + MODE[1:0] (0 = direct, all traps to BASE; 1 = vectored, interrupts to BASE + 4\xD7cause) \xA6 0x305
mcounteren \xA6 Which counters S-mode (and below) may read \xA6 0x306
menvcfg \xA6 Machine environment configuration \xA6 0x30A
mstatush \xA6 Upper half of mstatus (RV32 only) \xA6 0x310
mcountinhibit \xA6 Stop individual counters from incrementing \xA6 0x320
mscratch \xA6 Scratch register for the M-mode trap handler, typically a pointer to per-hart context \xA6 0x340
mepc \xA6 Machine exception PC: address of the trapping/interrupted instruction; mret returns here (add 4 to skip an ecall) \xA6 0x341
mcause \xA6 Machine trap cause: bit XLEN-1 set for interrupts (3 M-software, 7 M-timer, 11 M-external); exceptions 0 instr misaligned, 1 instr access fault, 2 illegal instr, 3 breakpoint, 4/6 load/store misaligned, 5/7 load/store access fault, 8/9/11 ecall from U/S/M, 12/13/15 page faults \xA6 0x342
mtval \xA6 Machine trap value: faulting address, or the illegal instruction's bits \xA6 0x343
mip \xA6 Machine interrupt pending: MSIP(3), MTIP(7), MEIP(11); SSIP(1), STIP(5), SEIP(9) \xA6 0x344
mtinst \xA6 Machine trap instruction (transformed), hypervisor extension \xA6 0x34A
mtval2 \xA6 Machine second trap value, hypervisor extension \xA6 0x34B
mcycle \xA6 Machine cycle counter (writable) \xA6 0xB00
minstret \xA6 Machine instructions-retired counter (writable) \xA6 0xB02
`);
function pmp(name) {
  const m = /^pmp(cfg|addr)(\d+)$/.exec(name);
  if (!m) return void 0;
  const n = Number(m[2]);
  if (m[1] === "cfg" && n <= 15) {
    return { summary: "PMP configuration: one byte per entry with R(0) W(1) X(2) A(4:3: 0 OFF, 1 TOR, 2 NA4, 3 NAPOT) L(7) lock", syntax: `0x${(928 + n).toString(16).toUpperCase()}` };
  }
  if (m[1] === "addr" && n <= 63) {
    return { summary: "PMP address register: physical address bits [XLEN+1:2] (the address shifted right by 2); NAPOT encodes the size in trailing ones", syntax: `0x${(944 + n).toString(16).toUpperCase()}` };
  }
  return void 0;
}
function describeRegister3(word) {
  var _a;
  const raw = word.toLowerCase();
  const w = raw.replace(/\.t$/, "");
  const notes = raw !== w ? ["v0.t: execute only where the mask in v0 is set"] : void 0;
  let m = /^x(\d+)$/.exec(w);
  if (m && Number(m[1]) <= 31) {
    const [abi, summary] = ABI[Number(m[1])];
    return { title: word, tag: "RISC-V register", summary: `${w} = ${abi}. ${summary}` };
  }
  const abiIdx = ABI.findIndex(([name]) => name === w);
  if (abiIdx >= 0) return { title: word, tag: "RISC-V register", summary: `${w} = x${abiIdx}. ${ABI[abiIdx][1]}` };
  if (w === "fp") return { title: word, tag: "RISC-V register", summary: "fp = s0 = x8. Frame pointer (callee-saved)" };
  m = /^f(\d+)$/.exec(w);
  if (m && Number(m[1]) <= 31) {
    const [abi, summary] = FP_ABI(Number(m[1]));
    return { title: word, tag: "RISC-V FP register", summary: `${w} = ${abi}. ${summary}` };
  }
  for (let i = 0; i < 32; i++) {
    const [abi, summary] = FP_ABI(i);
    if (abi === w) return { title: word, tag: "RISC-V FP register", summary: `${w} = f${i}. ${summary}` };
  }
  m = /^v(\d+)$/.exec(w);
  if (m && Number(m[1]) <= 31) {
    const summary = m[1] === "0" ? "Vector register 0, also the mask register for masked (v0.t) operations" : `Vector register ${m[1]} (all vector registers are caller-saved)`;
    return { title: word, tag: "RISC-V vector register", summary, notes };
  }
  const csr = (_a = CSR.get(w)) != null ? _a : pmp(w);
  if (csr) {
    return { title: word, tag: `RISC-V CSR \xB7 ${csr.syntax}`, summary: csr.summary };
  }
  return void 0;
}
var CSR_NAMES = [
  ...CSR.keys(),
  ...Array.from({ length: 16 }, (_, i) => `pmpcfg${i}`),
  ...Array.from({ length: 64 }, (_, i) => `pmpaddr${i}`)
];
function describeRiscv(text, kind) {
  if (kind === "mnemonic") return describeInstr3(text);
  if (kind === "register") return describeRegister3(text);
  return void 0;
}

// src/isa/riscv.ts
var MNEMONICS3 = new Set(words(`
  lui auipc jal jalr beq bne blt bge bltu bgeu lb lh lw lbu lhu sb sh sw
  addi slti sltiu xori ori andi slli srli srai add sub sll slt sltu xor srl sra or and
  fence ecall ebreak
  lwu ld sd addiw slliw srliw sraiw addw subw sllw srlw sraw
  mul mulh mulhsu mulhu div divu rem remu mulw divw divuw remw remuw
  csrrw csrrs csrrc csrrwi csrrsi csrrci mret sret wfi
  flw fsw fld fsd flh fsh flq fsq
  sh1add sh2add sh3add andn orn xnor clz ctz cpop max maxu min minu rol ror rori rev8
  clzw ctzw cpopw rolw rorw roriw
  vsetvli vsetivli vsetvl
  nop li la lla mv not neg negw seqz snez sltz sgtz
  beqz bnez blez bgez bltz bgtz bgt ble bgtu bleu j jr ret call tail
  csrr csrw csrs csrc csrwi csrsi csrci
  rdcycle rdtime rdinstret rdcycleh rdtimeh rdinstreth
  frcsr fscsr frrm fsrm frflags fsflags
`));
var DOTTED_BASES = new Set(words(`
  lr sc amoswap amoadd amoxor amoand amoor amomin amomax amominu amomaxu
  fadd fsub fmul fdiv fsqrt fmin fmax fmadd fmsub fnmadd fnmsub fcvt fmv fsgnj fsgnjn fsgnjx
  feq flt fle fclass fneg fabs fli
  fence sfence c sext zext add orc
  vle8 vle16 vle32 vle64 vse8 vse16 vse32 vse64 vlse8 vlse16 vlse32 vlse64
  vadd vsub vrsub vmul vdiv vdivu vrem vand vor vxor vsll vsrl vsra vmin vmax
  vmv vmerge vredsum vredmax vredmin vmacc vnmsac vslideup vslidedown vrgather
  vmseq vmsne vmslt vmsltu vmsle vmsleu vmsgt vmsgtu
  vfadd vfsub vfmul vfdiv vfmacc vfmin vfmax vfmv vfcvt vfredosum vfredusum
`));
var REGISTERS3 = /* @__PURE__ */ new Set([
  ...range("x", 0, 31),
  ...range("f", 0, 31),
  ...range("v", 0, 31),
  "zero",
  "ra",
  "sp",
  "gp",
  "tp",
  "fp",
  ...range("t", 0, 6),
  ...range("s", 0, 11),
  ...range("a", 0, 7),
  ...range("ft", 0, 11),
  ...range("fs", 0, 11),
  ...range("fa", 0, 7),
  ...CSR_NAMES
]);
function isRiscvMnemonic(word) {
  const w = word.replace(/\.(aq|rl|aqrl)$/, "");
  if (MNEMONICS3.has(w)) return true;
  const dot = w.indexOf(".");
  return dot > 0 && DOTTED_BASES.has(w.slice(0, dot));
}
var RISCV = {
  id: "riscv",
  name: "RISC-V",
  aliases: ["risc-v", "rv", "rv32", "rv64"],
  isMnemonic: isRiscvMnemonic,
  registers: REGISTERS3,
  lineComments: ["#", "//"],
  hashIsImmediate: false,
  describe: describeRiscv
};

// src/isa/index.ts
var ALL_ISAS = [RISCV, ARM32, ARM64];
var BY_TAG = /* @__PURE__ */ new Map();
for (const isa of ALL_ISAS) for (const tag of [isa.id, ...isa.aliases]) BY_TAG.set(tag, isa);

// src/docs/constraints.ts
var COMMANDS = docTable(`
create_clock \xA6 Define a clock on a port or pin: its period and waveform. Every timing check starts from a clock \xA6 create_clock -period 10.000 -name sys_clk [get_ports clk]
create_generated_clock \xA6 Define a clock derived from another one (divider, PLL output, forwarded clock) \xA6 create_generated_clock -name clk_div2 -source [get_ports clk] -divide_by 2 [get_pins div_reg/Q]
set_clock_groups \xA6 Declare clocks that don't need timing between them (asynchronous or never active together) \xA6 set_clock_groups -asynchronous -group [get_clocks clk_a] -group [get_clocks clk_b]
set_clock_latency \xA6 Clock delay from source to the clock definition point (-source) or to the registers \xA6 set_clock_latency -source 1.2 [get_clocks clk]
set_clock_uncertainty \xA6 Margin subtracted from setup/hold slack for jitter and skew \xA6 set_clock_uncertainty 0.2 [get_clocks clk]
set_clock_sense \xA6 Which clock edge propagates through a pin (positive/negative unate, or stop)
set_clock_transition \xA6 Rise/fall time of an ideal clock
set_propagated_clock \xA6 Use the actual clock-tree delays instead of ideal clocks
set_input_delay \xA6 External delay from the clock edge to data arriving at an input port (the upstream chip's clock-to-out plus board delay) \xA6 set_input_delay -clock sys_clk -max 3.0 [get_ports din]
set_output_delay \xA6 External time needed after an output port before the capturing clock edge (the downstream chip's setup plus board delay) \xA6 set_output_delay -clock sys_clk 2.0 [get_ports dout]
set_false_path \xA6 Don't time these paths (e.g. through a synchronizer or from a static configuration register) \xA6 set_false_path -from [get_ports rst_n]
set_multicycle_path \xA6 Allow paths N clock cycles instead of one; usually paired with a -hold of N-1 \xA6 set_multicycle_path 2 -setup -from [get_cells a_reg*] ; set_multicycle_path 1 -hold -from [get_cells a_reg*]
set_max_delay \xA6 Maximum delay for these paths, overriding the clock-derived requirement \xA6 set_max_delay -datapath_only 5.0 -from [get_clocks a] -to [get_clocks b]
set_min_delay \xA6 Minimum delay for these paths (hold-like requirement)
set_max_time_borrow \xA6 Limit how much time a path may borrow through a latch
set_case_analysis \xA6 Treat a pin or port as a constant 0/1 for timing (e.g. a mode select) \xA6 set_case_analysis 0 [get_ports test_mode]
set_disable_timing \xA6 Break timing arcs through a cell or pin
set_input_transition \xA6 Rise/fall time of signals at input ports
set_load \xA6 Capacitive load on output ports or nets
set_driving_cell \xA6 Library cell that drives an input port (models its transition)
set_drive \xA6 Drive resistance of an input port
set_bus_skew \xA6 Maximum skew between bits of a bus crossing clock domains (Vivado)
set_external_delay \xA6 External feedback delay between an output and an input port (Vivado)
set_data_check \xA6 Setup/hold-like check between two data pins
set_max_fanout \xA6 Maximum fanout for nets in the design
set_max_transition \xA6 Maximum transition time for nets in the design
set_max_capacitance \xA6 Maximum capacitance for nets in the design
set_logic_one set_logic_zero set_logic_dc \xA6 Tie an input to 1, 0 or don't-care for timing
set_clock_gating_check \xA6 Setup/hold requirements on clock-gating cells
set_units \xA6 Units for time, capacitance, etc. in this file \xA6 set_units -time ns
set_operating_conditions \xA6 Process/voltage/temperature corner for analysis
set_hierarchy_separator \xA6 Character separating hierarchy levels in names (default /)
group_path \xA6 Group paths for reporting and optimization priority
set_property \xA6 Set a property on design objects: pins, I/O standards, placement, synthesis attributes \xA6 set_property PACKAGE_PIN W5 [get_ports clk] / set_property -dict {PACKAGE_PIN W5 IOSTANDARD LVCMOS33} [get_ports clk]
reset_property \xA6 Reset a property to its default value
create_pblock \xA6 Create a physical block: a region to floorplan logic into (Vivado) \xA6 create_pblock pblock_cpu
add_cells_to_pblock \xA6 Assign cells to a pblock \xA6 add_cells_to_pblock pblock_cpu [get_cells cpu]
resize_pblock \xA6 Set the area a pblock covers \xA6 resize_pblock pblock_cpu -add SLICE_X0Y0:SLICE_X31Y49
create_debug_core \xA6 Insert an ILA (integrated logic analyzer) core (Vivado)
connect_debug_port \xA6 Connect nets to a debug core's probes
set_switching_activity \xA6 Toggle rates for power analysis
derive_pll_clocks \xA6 Quartus SDC: create generated clocks for every PLL output automatically
derive_clock_uncertainty \xA6 Quartus SDC: apply the device's clock uncertainty to all clocks
set_global_assignment \xA6 Quartus .qsf: project-wide setting, named with -name \xA6 set_global_assignment -name FAMILY "Cyclone V"
set_location_assignment \xA6 Quartus .qsf: put a port on a pin \xA6 set_location_assignment PIN_AF14 -to clk
set_instance_assignment \xA6 Quartus .qsf: setting for one node (I/O standard, drive strength, ...) \xA6 set_instance_assignment -name IO_STANDARD "3.3-V LVTTL" -to led[0]
set_io_assignment \xA6 Quartus .qsf: setting for an I/O pin
set_parameter \xA6 Quartus .qsf: override a Verilog/VHDL parameter or generic \xA6 set_parameter -name WIDTH 16
set_user_option \xA6 Quartus .qsf: tool option
set_io \xA6 PCF (icestorm/nextpnr): put a port on a package pin \xA6 set_io [-nowarn] [-pullup yes|no] [-pullup_resistor 3P3K|6P8K|10K|100K] clk 35
set_frequency \xA6 PCF (nextpnr): target frequency of a clock net in MHz \xA6 set_frequency clk 12
ldc_set_location \xA6 Lattice Radiant .pdc: put a port on a pin \xA6 ldc_set_location -site {A1} [get_ports clk]
ldc_set_port \xA6 Lattice Radiant .pdc: I/O attributes of a port \xA6 ldc_set_port -iobuf {IO_TYPE=LVCMOS33} [get_ports led]
ldc_set_vcc \xA6 Lattice Radiant .pdc: bank voltage
`);
var TCL_COMMANDS = docTable(`
set \xA6 Tcl: set a variable (read it back as $name) \xA6 set period 10.0
unset \xA6 Tcl: delete a variable
foreach \xA6 Tcl: loop over a list \xA6 foreach p {a b c} { ... }
for while \xA6 Tcl: loop
if else elseif \xA6 Tcl: conditional \xA6 if {$x > 1} { ... } else { ... }
proc \xA6 Tcl: define a procedure
return \xA6 Tcl: return from a procedure
puts \xA6 Tcl: print a line
expr \xA6 Tcl: evaluate an arithmetic expression \xA6 [expr {$period / 2}]
incr \xA6 Tcl: add to an integer variable
append lappend \xA6 Tcl: append to a string / list variable
list lindex llength \xA6 Tcl: build a list / get an element / get its length
source \xA6 Tcl: run another Tcl or constraint file
global upvar variable namespace \xA6 Tcl: variable scoping
switch \xA6 Tcl: multi-way branch
break continue \xA6 Tcl: leave a loop / skip to its next iteration
catch error \xA6 Tcl: trap / raise an error
eval format \xA6 Tcl: evaluate a script / format a string
`);
var QUERIES = docTable(`
get_ports \xA6 Top-level ports by name (wildcards * and ?) \xA6 [get_ports {led[*]}]
get_pins \xA6 Pins of cells (hierarchical names ending in /PIN) \xA6 [get_pins clk_gen/inst/CLKOUT0]
get_cells \xA6 Cell instances: registers, LUTs, RAMs, submodules \xA6 [get_cells -hier *sync_reg*]
get_nets \xA6 Nets by name
get_clocks \xA6 Clocks created by create_clock / create_generated_clock (or auto-derived) \xA6 [get_clocks sys_clk]
get_generated_clocks \xA6 Generated clocks only
get_iobanks \xA6 I/O banks of the device (Vivado)
get_sites \xA6 Placement sites of the device (Vivado)
get_package_pins \xA6 Package pins of the device (Vivado)
get_pblocks \xA6 Pblocks by name (Vivado)
get_debug_cores \xA6 Debug cores (ILA) (Vivado)
get_bels \xA6 Basic elements inside sites (Vivado)
get_property \xA6 Read a property of an object \xA6 [get_property PERIOD [get_clocks clk]]
get_designs \xA6 Designs in memory
get_lib_cells \xA6 Cells from the technology library
get_timing_paths \xA6 Timing paths, for scripting reports
all_inputs all_outputs \xA6 Every input / output port
all_clocks \xA6 Every clock
all_registers \xA6 Every sequential cell
all_fanin all_fanout \xA6 Everything driving / driven by the given pins
current_design \xA6 The design the constraints apply to
current_instance \xA6 Scope later object queries to this hierarchical instance
`);
var PROPERTIES = docTable(`
PACKAGE_PIN \xA6 Package pin (ball) a port is placed on, from the board schematic \xA6 set_property PACKAGE_PIN W5 [get_ports clk]
LOC \xA6 Placement site of a cell (or pin of a port) \xA6 set_property LOC SLICE_X0Y0 [get_cells r_reg]
BEL \xA6 Basic element within the site (e.g. A6LUT, AFF)
IOSTANDARD \xA6 I/O electrical standard; must match the bank voltage (LVCMOS33, LVCMOS18, LVDS_25, SSTL15, ...) \xA6 set_property IOSTANDARD LVCMOS33 [get_ports led]
DRIVE \xA6 Output drive strength in mA (LVCMOS outputs) \xA6 set_property DRIVE 8 [get_ports led]
SLEW \xA6 Output edge rate: SLOW (less noise, default) or FAST
PULLUP PULLDOWN \xA6 Enable the weak pull-up / pull-down on the pin \xA6 set_property PULLUP true [get_ports btn]
PULLTYPE \xA6 Weak pull on the pin: PULLUP, PULLDOWN, KEEPER or NONE
KEEPER \xA6 Weak keeper holds the last driven value
IN_TERM \xA6 Internal input termination (e.g. UNTUNED_SPLIT_50)
DIFF_TERM DIFF_TERM_ADV \xA6 Internal 100 \u03A9 differential termination for LVDS inputs
IOB \xA6 Pack this register into the I/O block for consistent pin timing \xA6 set_property IOB TRUE [get_cells dout_reg]
ASYNC_REG \xA6 Register is part of a clock-domain-crossing synchronizer: placed close together and excluded from some optimizations \xA6 set_property ASYNC_REG TRUE [get_cells {sync_reg[*]}]
DONT_TOUCH \xA6 Keep this cell or net through optimization
MARK_DEBUG \xA6 Make the net available for an ILA debug probe
KEEP \xA6 Don't optimize away or absorb this net
KEEP_HIERARCHY \xA6 Don't flatten this module's hierarchy
MAX_FANOUT \xA6 Replicate the driver if fanout exceeds this
CLOCK_DEDICATED_ROUTE \xA6 FALSE allows a clock from a non-clock-capable pin (degrades timing; a DRC otherwise errors)
CFGBVS \xA6 Configuration bank voltage select: VCCO or GND; must match the board (7-series)
CONFIG_VOLTAGE \xA6 Configuration bank voltage (e.g. 3.3)
CONFIG_MODE \xA6 Configuration interface, e.g. SPIx4
BITSTREAM.GENERAL.COMPRESS \xA6 Compress the bitstream (faster load, smaller flash)
BITSTREAM.CONFIG.SPI_BUSWIDTH \xA6 SPI flash data width: 1, 2 or 4
BITSTREAM.CONFIG.CONFIGRATE \xA6 Configuration clock rate in MHz
BITSTREAM.CONFIG.UNUSEDPIN \xA6 Unused pins after configuration: Pulldown, Pullup or Pullnone
RAM_STYLE \xA6 Synthesis: block, distributed, register or ultra RAM for this memory
ROM_STYLE \xA6 Synthesis: block or distributed ROM
SHREG_EXTRACT \xA6 Synthesis: allow shift registers to map to SRL primitives
FSM_ENCODING \xA6 Synthesis: state encoding (one_hot, sequential, gray, johnson, auto)
USE_DSP \xA6 Synthesis: map arithmetic to DSP blocks
IODELAY_GROUP \xA6 Group IDELAY/ODELAY cells with their IDELAYCTRL
FAMILY \xA6 Quartus: device family \xA6 set_global_assignment -name FAMILY "Cyclone V"
DEVICE \xA6 Quartus: exact part number \xA6 set_global_assignment -name DEVICE 5CSEMA5F31C6
TOP_LEVEL_ENTITY \xA6 Quartus: name of the top-level module/entity
IO_STANDARD \xA6 Quartus: I/O standard of a pin \xA6 set_instance_assignment -name IO_STANDARD "3.3-V LVTTL" -to clk
CURRENT_STRENGTH_NEW \xA6 Quartus: output drive strength
SLEW_RATE \xA6 Quartus: output slew rate (0 = slowest)
WEAK_PULL_UP_RESISTOR \xA6 Quartus: enable the pin's weak pull-up
VIRTUAL_PIN \xA6 Quartus: keep this port internal (not a real pin), e.g. when compiling a submodule alone
VERILOG_FILE SYSTEMVERILOG_FILE VHDL_FILE \xA6 Quartus: add a source file to the project
SDC_FILE \xA6 Quartus: timing constraints file used by Timing Analyzer
QIP_FILE \xA6 Quartus: IP core file list
PROJECT_OUTPUT_DIRECTORY \xA6 Quartus: where compile outputs go
`);
var FLAGS = docTable(`
-period \xA6 Clock period in ns (100 MHz \u2192 10.000)
-waveform \xA6 Rise and fall times within the period in ns; default {0 period/2} (50% duty) \xA6 -waveform {0 5}
-name \xA6 Name of the clock being created; in a Quartus .qsf, the name of the setting
-add \xA6 Add this clock to a pin that already has one instead of replacing it
-source \xA6 Master clock pin a generated clock derives from
-master_clock \xA6 Which clock at -source to derive from when it has several
-divide_by -multiply_by \xA6 Generated clock frequency relative to its source
-edges \xA6 Generated clock waveform given as source edges
-clock \xA6 Clock the external delay is relative to
-clock_fall \xA6 Delay is relative to the falling edge of -clock
-add_delay \xA6 Add another input/output delay rather than replacing the existing one (e.g. for a second clock)
-max -min \xA6 Setup (max) or hold (min) analysis value
-from -to -through \xA6 Path start points, end points and intermediate pins; in a .qsf, -to names the node a setting applies to
-rise_from -fall_from -rise_to -fall_to \xA6 Like -from/-to, only for one edge
-setup -hold \xA6 Apply to setup or hold checks only
-start -end \xA6 Count multicycle cycles in the launch (start) or capture (end, default for setup) clock
-datapath_only \xA6 Ignore clock skew: constrain only the data path delay (for CDC paths)
-asynchronous \xA6 Clock groups are asynchronous to each other
-physically_exclusive -logically_exclusive \xA6 Clock groups never exist / are never active at the same time
-group \xA6 A group of clocks for set_clock_groups
-dict \xA6 Set several properties at once as name/value pairs \xA6 -dict {PACKAGE_PIN W5 IOSTANDARD LVCMOS33}
-of_objects \xA6 Objects connected to the given ones (e.g. pins of a cell) \xA6 [get_pins -of_objects [get_cells u0]]
-filter \xA6 Keep objects whose properties match an expression \xA6 [get_cells -hier -filter {REF_NAME == FDRE}]
-hierarchical -hier \xA6 Search all levels of hierarchy
-regexp -nocase \xA6 Match names as regular expressions / case-insensitively
-quiet \xA6 Don't warn if nothing matches
-nowarn \xA6 PCF: don't warn if the port doesn't exist in the design
-pullup \xA6 PCF: enable the pin's pull-up (yes/no)
-pullup_resistor \xA6 PCF (UltraPlus): pull-up strength
-section -entity -tag \xA6 Quartus .qsf: scope of the assignment
`);
var lookup = (tag, title, e) => e && { title, tag, ...e };
function describeConstraint(text, kind) {
  var _a;
  switch (kind) {
    case "keyword":
      return (_a = lookup("Constraint command", text, COMMANDS.get(text))) != null ? _a : lookup("Tcl command", text, TCL_COMMANDS.get(text));
    case "function":
      return lookup("Object query", text, QUERIES.get(text));
    case "property":
      return lookup("Constraint property", text, PROPERTIES.get(text.toUpperCase()));
    case "directive":
      return lookup("Option", text, FLAGS.get(text));
    default:
      return void 0;
  }
}

// src/lang/constraints.ts
var COMMANDS2 = new Set(words(`
  create_clock create_generated_clock set_clock_groups set_clock_latency set_clock_uncertainty
  set_clock_sense set_clock_transition set_propagated_clock set_input_delay set_output_delay
  set_false_path set_multicycle_path set_max_delay set_min_delay set_max_time_borrow set_case_analysis
  set_disable_timing set_input_transition set_load set_driving_cell set_drive set_bus_skew
  set_external_delay set_data_check set_max_fanout set_max_transition set_max_capacitance
  set_logic_one set_logic_zero set_logic_dc set_clock_gating_check set_units set_operating_conditions
  set_hierarchy_separator group_path set_property reset_property create_pblock add_cells_to_pblock
  resize_pblock create_debug_core connect_debug_port set_switching_activity
  derive_pll_clocks derive_clock_uncertainty
  set_global_assignment set_location_assignment set_instance_assignment set_io_assignment set_parameter
  set_user_option
  set_io set_frequency ldc_set_location ldc_set_port ldc_set_vcc
`));
var QUERIES2 = new Set(words(`
  get_ports get_pins get_cells get_nets get_clocks get_generated_clocks get_iobanks get_sites
  get_package_pins get_pblocks get_debug_cores get_bels get_property get_designs get_lib_cells
  get_timing_paths all_inputs all_outputs all_clocks all_registers all_fanin all_fanout
  current_design current_instance
`));
var TCL = new Set(words(`
  set unset foreach for if else elseif while proc return puts expr incr append lappend list lindex
  llength source global upvar variable namespace switch break continue catch error eval format
`));
var PROPERTY_FIRST = new Set(words("set_property reset_property get_property"));
function makeConstraintParser() {
  return {
    startState: () => ({ cmdStart: true, continues: false, propertyNext: false, brackets: 0, command: "" }),
    copyState: (s) => ({ ...s }),
    token(stream, s) {
      if (stream.sol()) {
        if (!s.continues && s.brackets === 0) {
          s.cmdStart = true;
          s.propertyNext = false;
        }
        s.continues = /\\$/.test(stream.string);
      }
      if (stream.eatSpace()) return null;
      if (stream.match("#")) {
        stream.skipToEnd();
        return "comment";
      }
      if (stream.match(/^"(?:[^"\\]|\\.)*"?/)) {
        s.cmdStart = false;
        return "string";
      }
      if (stream.match(/^\$(?:\{[^}]*\}?|[\w:]+)/)) {
        s.cmdStart = false;
        return "variable";
      }
      if (!s.cmdStart && stream.match(/^-[a-z_]\w*/i)) {
        if (stream.current() === "-name" && /^set_\w*assignment$/.test(s.command)) s.propertyNext = true;
        return "directive";
      }
      if (stream.match(/^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?(?![\w.])/i)) {
        s.cmdStart = false;
        return "number";
      }
      if (stream.match(/^[^\s[\]{}";$\\#]+/)) {
        const word = stream.current();
        const cmdStart = s.cmdStart;
        s.cmdStart = false;
        if (cmdStart) {
          s.command = word;
          if (PROPERTY_FIRST.has(word)) s.propertyNext = true;
          if (COMMANDS2.has(word) || TCL.has(word)) return "keyword";
          if (QUERIES2.has(word)) return "function";
          return null;
        }
        if (QUERIES2.has(word)) return "function";
        if (s.propertyNext) {
          s.propertyNext = false;
          return "property";
        }
        if (word === word.toUpperCase() && describeConstraint(word, "property")) return "property";
        return null;
      }
      const ch = stream.next();
      if (ch === "[") {
        s.brackets++;
        s.cmdStart = true;
      } else if (ch === "]") s.brackets = Math.max(0, s.brackets - 1);
      else if (ch === ";") {
        s.cmdStart = true;
        s.propertyNext = false;
      }
      return null;
    }
  };
}
function constraintLanguage(id, name, aliases) {
  return { id, name, aliases, makeParser: makeConstraintParser, lineComment: "#", describe: describeConstraint };
}
var CONSTRAINT_LANGUAGES = [
  constraintLanguage("xdc", "Xilinx XDC", []),
  constraintLanguage("sdc", "SDC", []),
  constraintLanguage("pcf", "PCF", []),
  constraintLanguage("qsf", "Quartus QSF", [])
];

// src/docs/devicetree.ts
var PROPERTIES2 = docTable(`
compatible \xA6 Strings naming the device, most specific first ("vendor,device", then fallbacks); the OS binds a driver by matching them \xA6 compatible = "sifive,uart0";
model \xA6 Human-readable board or device model \xA6 model = "StarFive VisionFive 2";
phandle \xA6 Unique numeric ID other nodes use to reference this node (dtc generates it from labels) \xA6 phandle = <1>;
status \xA6 "okay" enables the device; "disabled" means not used (often enabled per board with &label { status = "okay"; }) \xA6 status = "okay";
#address-cells \xA6 Number of 32-bit cells in each child's reg address \xA6 #address-cells = <2>;
#size-cells \xA6 Number of 32-bit cells in each child's reg size (0 for cpus, where reg is just the hart/core ID) \xA6 #size-cells = <1>;
reg \xA6 Register blocks as <address size> pairs, in the parent's address space (cell counts from the parent's #address-cells / #size-cells) \xA6 reg = <0x0 0x10000000 0x0 0x1000>;
virtual-reg \xA6 Virtual address the firmware maps the device at
ranges \xA6 Maps child bus addresses to parent addresses as <child-addr parent-addr size>; empty means 1:1 \xA6 ranges = <0x0 0x0 0x40000000 0x10000000>;
dma-ranges \xA6 Like ranges, but for DMA from devices on this bus to memory
dma-coherent \xA6 The device's DMA is cache-coherent (no cache maintenance needed)
device_type \xA6 Deprecated except for "cpu" and "memory" nodes \xA6 device_type = "memory";
interrupts \xA6 Interrupt specifiers, format set by the parent controller's #interrupt-cells. GIC: <type number flags>, e.g. <GIC_SPI 33 IRQ_TYPE_LEVEL_HIGH>; PLIC: <source> \xA6 interrupts = <GIC_SPI 33 IRQ_TYPE_LEVEL_HIGH>;
interrupt-parent \xA6 phandle of the interrupt controller (inherited from ancestors when absent) \xA6 interrupt-parent = <&plic>;
interrupts-extended \xA6 Interrupts wired to several controllers: <&ctrl specifier ...> \xA6 interrupts-extended = <&cpu0_intc 11>, <&cpu0_intc 9>;
interrupt-controller \xA6 Marks this node as an interrupt controller
#interrupt-cells \xA6 Number of cells in an interrupt specifier for this controller \xA6 #interrupt-cells = <3>;
interrupt-names \xA6 Names for the entries in interrupts, for platform_get_irq_byname()
interrupt-map interrupt-map-mask \xA6 Translate child interrupt specifiers (e.g. PCI INTx) to parent controllers
clocks \xA6 Clock specifiers: <&provider clock-id> \xA6 clocks = <&rcc 12>;
clock-names \xA6 Names for the entries in clocks, used by clk_get(dev, "name")
#clock-cells \xA6 Number of cells in a clock specifier for this provider (0 for a single fixed clock)
clock-frequency \xA6 Clock rate in Hz (fixed clocks, a UART's input clock, CPU timebase) \xA6 clock-frequency = <24000000>;
clock-output-names \xA6 Names of the clocks this provider outputs
assigned-clocks assigned-clock-rates assigned-clock-parents \xA6 Configure clock rates / parents at boot
resets \xA6 Reset line specifiers: <&reset-controller id>
reset-names \xA6 Names for the entries in resets
#reset-cells \xA6 Number of cells in a reset specifier
gpios \xA6 GPIO specifiers: <&gpio-controller pin flags> \xA6 gpios = <&gpio0 5 GPIO_ACTIVE_LOW>;
gpio-controller \xA6 Marks this node as a GPIO controller
#gpio-cells \xA6 Number of cells in a GPIO specifier (usually 2: pin, flags)
pinctrl-names \xA6 Names of the pin states ("default", "sleep"); pinctrl-N is state N \xA6 pinctrl-names = "default";
dmas \xA6 DMA channel specifiers: <&dma-controller channel ...>
dma-names \xA6 Names for the entries in dmas ("rx", "tx")
#dma-cells \xA6 Number of cells in a DMA specifier
iommus \xA6 IOMMU specifiers for this device
#iommu-cells \xA6 Number of cells in an IOMMU specifier
power-domains \xA6 Power domain specifiers
#power-domain-cells \xA6 Number of cells in a power domain specifier
msi-parent \xA6 phandle of the MSI controller
pwms \xA6 PWM specifiers: <&pwm channel period-ns flags>
#pwm-cells \xA6 Number of cells in a PWM specifier
bootargs \xA6 (/chosen) Kernel command line \xA6 bootargs = "console=ttyS0,115200 root=/dev/mmcblk0p2";
stdout-path \xA6 (/chosen) Console device: a path or alias, optionally with ":115200n8" \xA6 stdout-path = "serial0:115200n8";
linux,initrd-start linux,initrd-end \xA6 (/chosen) Physical address range of the initramfs, set by the bootloader
kaslr-seed rng-seed \xA6 (/chosen) Entropy passed by the bootloader
timebase-frequency \xA6 Frequency in Hz of the RISC-V time CSR / PowerPC timebase (in /cpus) \xA6 timebase-frequency = <10000000>;
riscv,isa \xA6 RISC-V hart ISA string \xA6 riscv,isa = "rv64imafdc_zicsr_zifencei";
riscv,isa-base \xA6 RISC-V base ISA ("rv32i" or "rv64i")
riscv,isa-extensions \xA6 RISC-V extensions as a string list \xA6 riscv,isa-extensions = "i", "m", "a", "c";
riscv,ndev \xA6 Number of interrupt sources a RISC-V PLIC supports
mmu-type \xA6 RISC-V MMU mode of a hart \xA6 mmu-type = "riscv,sv39";
enable-method \xA6 How the OS starts secondary CPUs: "psci" or "spin-table" \xA6 enable-method = "psci";
cpu-release-addr \xA6 spin-table: address the secondary CPU polls for its entry point
next-level-cache \xA6 phandle of the next cache level
cache-level cache-size cache-line-size cache-sets cache-unified \xA6 Cache geometry
memory-region \xA6 phandle(s) of reserved-memory nodes this device uses
no-map \xA6 reserved-memory: exclude from the kernel's linear mapping entirely
reusable \xA6 reserved-memory: the OS may use it while the owner doesn't (CMA)
size alignment alloc-ranges \xA6 reserved-memory: dynamically placed region
label \xA6 Human-readable name for the device
current-speed \xA6 UART baud rate \xA6 current-speed = <115200>;
reg-shift \xA6 Register stride as a power of two (ns16550: registers 4 bytes apart \u2192 2)
reg-io-width \xA6 Register access width in bytes
wakeup-source \xA6 The device can wake the system from suspend
local-mac-address mac-address \xA6 Ethernet MAC address bytes \xA6 local-mac-address = [00 11 22 33 44 55];
phy-mode phy-connection-type \xA6 Ethernet PHY interface ("rgmii", "rmii", ...)
phy-handle \xA6 phandle of the Ethernet PHY node
spi-max-frequency \xA6 SPI device: maximum clock in Hz
interrupt-affinity \xA6 CPUs that receive these interrupts (PMU)
method \xA6 PSCI conduit: "smc" or "hvc" \xA6 method = "smc";
`);
var KEYWORDS = docTable(`
/dts-v1/ \xA6 Marks the file as DTS version 1; required at the top of a .dts \xA6 /dts-v1/;
/plugin/ \xA6 This source is a device tree overlay (applied on top of a base tree) \xA6 /plugin/;
/include/ \xA6 Include another .dtsi (dtc's own include, without the C preprocessor) \xA6 /include/ "board.dtsi"
/delete-node/ \xA6 Remove a node inherited from an included file \xA6 /delete-node/ &uart1;
/delete-property/ \xA6 Remove a property inherited from an included file \xA6 /delete-property/ clocks;
/memreserve/ \xA6 Reserve a physical memory range in the FDT header (OS must not use it) \xA6 /memreserve/ 0x80000000 0x200000;
/bits/ \xA6 Cell size for the following array: 8, 16, 32 or 64 \xA6 prop = /bits/ 8 <0x12 0x34>;
/omit-if-no-ref/ \xA6 Drop this node if nothing references it \xA6 /omit-if-no-ref/ uart_pins: uart-pins { ... };
`);
var NODES = docTable(`
/ \xA6 Root node: board-level compatible/model, #address-cells/#size-cells for top-level nodes
cpus \xA6 Container for cpu nodes; usually #address-cells = <1>, #size-cells = <0>, and the timebase frequency on RISC-V
cpu \xA6 One CPU core / hart; reg is its ID (MPIDR affinity on Arm, hart ID on RISC-V)
memory \xA6 Physical RAM: device_type = "memory" and reg = <base size>
chosen \xA6 Not a device: parameters from the bootloader (bootargs, stdout-path, initrd)
aliases \xA6 Short names for nodes (serial0 = &uart0), used for console naming and stdout-path
reserved-memory \xA6 Memory carved out for firmware, DMA pools or co-processors
soc \xA6 Container for on-chip peripherals, usually "simple-bus" with ranges
interrupt-controller \xA6 GIC, PLIC, NVIC-like controller (interrupt-controller property)
timer \xA6 Timer device (Arm generic timer, CLINT/ACLINT on RISC-V)
psci \xA6 Power State Coordination Interface: CPU on/off and suspend through firmware
plic \xA6 RISC-V platform-level interrupt controller (external interrupts)
clint \xA6 RISC-V core-local interruptor: machine software and timer interrupts (mtime / mtimecmp)
__symbols__ \xA6 Generated label table used to resolve overlay references
`);
var MACROS = docTable(`
GIC_SPI \xA6 0: shared peripheral interrupt; the number is INTID \u2212 32
GIC_PPI \xA6 1: private (per-core) peripheral interrupt; the number is INTID \u2212 16
IRQ_TYPE_NONE \xA6 0: no trigger type
IRQ_TYPE_EDGE_RISING \xA6 1: rising-edge triggered
IRQ_TYPE_EDGE_FALLING \xA6 2: falling-edge triggered
IRQ_TYPE_EDGE_BOTH \xA6 3: triggered on both edges
IRQ_TYPE_LEVEL_HIGH \xA6 4: active-high level triggered
IRQ_TYPE_LEVEL_LOW \xA6 8: active-low level triggered
GPIO_ACTIVE_HIGH \xA6 0: line is active when high
GPIO_ACTIVE_LOW \xA6 1: line is active when low (the kernel inverts values)
GPIO_OPEN_DRAIN \xA6 Open-drain output
`);
function property(name) {
  const e = PROPERTIES2.get(name);
  if (e) return { title: name, tag: "Devicetree property", ...e };
  let m = /^pinctrl-(\d+)$/.exec(name);
  if (m) return { title: name, tag: "Devicetree property", summary: `Pin configuration for pin state ${m[1]} (named by pinctrl-names)`, syntax: `${name} = <&uart0_pins>;` };
  m = /^#([\w-]+)-cells$/.exec(name);
  if (m) return { title: name, tag: "Devicetree property", summary: `Number of cells in a ${m[1]} specifier for this provider` };
  m = /^(.+)-gpios?$/.exec(name);
  if (m) return { title: name, tag: "Devicetree property", summary: `GPIO(s) used as "${m[1]}": <&gpio-controller pin flags>`, syntax: `${name} = <&gpio0 5 GPIO_ACTIVE_LOW>;` };
  m = /^(.+)-supply$/.exec(name);
  if (m) return { title: name, tag: "Devicetree property", summary: `phandle of the regulator powering the "${m[1]}" supply` };
  m = /^(.+)-names$/.exec(name);
  if (m) return { title: name, tag: "Devicetree property", summary: `Names for the entries of the ${m[1]} property` };
  return void 0;
}
function describeDevicetree(text, kind) {
  if (kind === "property") return property(text);
  if (kind === "keyword") {
    const e = KEYWORDS.get(text);
    return e && { title: text, tag: "Devicetree directive", ...e };
  }
  if (kind === "function") {
    const e = NODES.get(text);
    return e && { title: text, tag: "Devicetree node", ...e };
  }
  if (kind === "variable") {
    const e = MACROS.get(text);
    return e && { title: text, tag: "dt-bindings constant", ...e };
  }
  return void 0;
}

// src/lang/devicetree.ts
var PREPROC = /^#\s*(?:include|define|undef|ifdef|ifndef|if|elif|else|endif|error|pragma)\b/;
var KEYWORD = /^\/(?:dts-v1|plugin|include|delete-node|delete-property|memreserve|bits|omit-if-no-ref)\//;
var NUMBER = /^(?:0x[0-9a-f]+|\d+)(?:ull|ul|ll|u|l)?\b/i;
function makeDevicetreeParser() {
  return {
    startState: () => ({ inBlockComment: false, stmtStart: true, inBytes: false }),
    copyState: (s) => ({ ...s }),
    token(stream, s) {
      if (s.inBlockComment) {
        if (stream.match(/^.*?\*\//)) s.inBlockComment = false;
        else stream.skipToEnd();
        return "comment";
      }
      if (stream.eatSpace()) return null;
      if (stream.match("/*")) {
        if (!stream.match(/^.*?\*\//)) {
          s.inBlockComment = true;
          stream.skipToEnd();
        }
        return "comment";
      }
      if (stream.match("//")) {
        stream.skipToEnd();
        return "comment";
      }
      if (s.stmtStart && stream.match(PREPROC)) {
        stream.skipToEnd();
        return "directive";
      }
      if (stream.match(KEYWORD)) {
        if (stream.current() === "/memreserve/") s.stmtStart = false;
        return "keyword";
      }
      if (stream.match(/^"(?:[^"\\]|\\.)*"?/)) return "string";
      if (stream.match(/^'(?:[^'\\]|\\.)'?/)) return "string";
      if (stream.match(/^&\{[^}]*\}?/) || stream.match(/^&[a-z_]\w*/i)) {
        s.stmtStart = false;
        return "label";
      }
      if (s.inBytes) {
        if (stream.match("]")) s.inBytes = false;
        else if (stream.match(/^[0-9a-f]{2}/i)) return "number";
        else stream.next();
        return null;
      }
      if (s.stmtStart) {
        if (stream.match(/^[a-z_]\w*:(?!:)/i)) return "label";
        if (stream.match(/^\/(?=\s*\{)/)) {
          s.stmtStart = false;
          return "function";
        }
        if (stream.match(/^[a-z0-9#,._+?-]+/i)) {
          s.stmtStart = false;
          return stream.peek() === "@" || stream.match(/^\s*\{/, false) ? "function" : "property";
        }
      }
      if (stream.match(/^@[\w,.:+-]*/)) return "number";
      if (stream.match(NUMBER)) return "number";
      if (stream.match(/^[A-Z_][A-Z0-9_]*\b/)) return "variable";
      if (stream.match(/^\w[\w.-]*/)) return null;
      const ch = stream.next();
      if (ch === "{" || ch === "}" || ch === ";") s.stmtStart = true;
      else if (ch === "[") s.inBytes = true;
      return null;
    }
  };
}
var DEVICETREE = {
  id: "dts",
  name: "Devicetree",
  aliases: ["dtsi", "devicetree", "device-tree"],
  makeParser: makeDevicetreeParser,
  lineComment: "//",
  blockComment: ["/*", "*/"],
  describe: describeDevicetree
};

// src/docs/linker.ts
var KEYWORDS2 = docTable(`
ENTRY \xA6 Set the program entry point (first instruction executed; e_entry in the ELF header) \xA6 ENTRY(Reset_Handler)
INCLUDE \xA6 Include another linker script \xA6 INCLUDE memory.ld
INPUT \xA6 Add input files, as if named on the command line \xA6 INPUT(crt0.o)
GROUP \xA6 Archives searched repeatedly until no new undefined symbols are resolved \xA6 GROUP(-lc -lgcc)
AS_NEEDED \xA6 Inside INPUT/GROUP: link shared libraries only if needed \xA6 AS_NEEDED(-lm)
OUTPUT \xA6 Name of the output file \xA6 OUTPUT(firmware.elf)
SEARCH_DIR \xA6 Add a library search directory (like -L) \xA6 SEARCH_DIR(lib)
STARTUP \xA6 Link this file first \xA6 STARTUP(crt0.o)
OUTPUT_FORMAT \xA6 BFD output format (default, big-endian, little-endian) \xA6 OUTPUT_FORMAT("elf32-littlearm")
OUTPUT_ARCH \xA6 Target architecture \xA6 OUTPUT_ARCH(riscv)
TARGET \xA6 BFD format for input files \xA6 TARGET(binary)
REGION_ALIAS \xA6 Give a memory region another name, so one script works for several memory layouts \xA6 REGION_ALIAS("REGION_TEXT", FLASH)
ASSERT \xA6 Fail the link with a message if the expression is zero \xA6 ASSERT(_end <= ORIGIN(RAM) + LENGTH(RAM), "RAM overflow")
EXTERN \xA6 Force symbols to be undefined so they get pulled from archives \xA6 EXTERN(vector_table)
FORCE_COMMON_ALLOCATION \xA6 Allocate common symbols even for relocatable output
INHIBIT_COMMON_ALLOCATION \xA6 Don't allocate common symbols even for executables
FORCE_GROUP_ALLOCATION \xA6 Place group members like normal sections
INSERT \xA6 Insert these statements AFTER/BEFORE a section of the default script \xA6 INSERT AFTER .text;
AFTER BEFORE \xA6 Position for INSERT
NOCROSSREFS \xA6 Error if any of these output sections reference each other \xA6 NOCROSSREFS(.overlay1 .overlay2)
NOCROSSREFS_TO \xA6 Error if other sections reference the first one \xA6 NOCROSSREFS_TO(.text .data)
LD_FEATURE \xA6 Enable a linker feature \xA6 LD_FEATURE("SANE_EXPR")
SECTIONS \xA6 Describes how input sections map to output sections and where they go in memory \xA6 SECTIONS { .text : { *(.text*) } > FLASH }
MEMORY \xA6 Declares memory regions with attributes, start and size \xA6 MEMORY { FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 512K }
PHDRS \xA6 Define ELF program headers (segments) explicitly \xA6 PHDRS { text PT_LOAD FILEHDR PHDRS; }
VERSION \xA6 Symbol versioning script for shared libraries \xA6 VERSION { V1 { global: f; local: *; }; }
OVERLAY \xA6 Sections that share the same run address but load at different addresses \xA6 OVERLAY : { .ov1 { ... } .ov2 { ... } } > RAM AT> FLASH
HIDDEN \xA6 Define a symbol hidden from outside the output (not exported) \xA6 HIDDEN(sym = .);
PROVIDE \xA6 Define a symbol only if it is referenced but not defined elsewhere \xA6 PROVIDE(end = .);
PROVIDE_HIDDEN \xA6 PROVIDE with hidden visibility (e.g. __init_array_start) \xA6 PROVIDE_HIDDEN(__init_array_start = .);
KEEP \xA6 Keep these input sections even with --gc-sections (vector tables, init arrays) \xA6 KEEP(*(.isr_vector))
EXCLUDE_FILE \xA6 Exclude files from an input section pattern \xA6 *(EXCLUDE_FILE(*crtend.o) .ctors)
INPUT_SECTION_FLAGS \xA6 Match input sections by ELF flags \xA6 INPUT_SECTION_FLAGS(SHF_ALLOC) *(.text)
SORT SORT_BY_NAME \xA6 Sort matched input sections by name \xA6 *(SORT(.text.*))
SORT_BY_ALIGNMENT \xA6 Sort matched input sections by descending alignment
SORT_BY_INIT_PRIORITY \xA6 Sort by init priority encoded in the name (.init_array.NNNNN) \xA6 KEEP(*(SORT_BY_INIT_PRIORITY(.init_array.*)))
SORT_NONE \xA6 Disable sorting, even with --sort-section
REVERSE \xA6 Reverse the order of matched sections
FILL \xA6 Fill pattern for gaps in the current section \xA6 FILL(0xFF)
CREATE_OBJECT_SYMBOLS \xA6 Create a symbol for each input file
CONSTRUCTORS \xA6 Place C++ constructor tables (a.out / ECOFF formats)
COMMON \xA6 Input section of uninitialized common symbols; usually placed in .bss \xA6 *(COMMON)
BYTE SHORT LONG QUAD SQUAD \xA6 Emit 1 / 2 / 4 / 8 / 8 (signed) bytes of data \xA6 LONG(0xDEADBEEF)
ASCIZ \xA6 Emit a NUL-terminated string \xA6 ASCIZ "version 1"
AT \xA6 Load address (LMA) differs from the run address (VMA): e.g. .data runs in RAM but is stored in flash and copied by startup code \xA6 .data : AT(ADDR(.text) + SIZEOF(.text)) { ... }  /  > RAM AT> FLASH
ALIGN_WITH_INPUT \xA6 Keep VMA \u2212 LMA constant within the section
SUBALIGN \xA6 Force the alignment of input sections \xA6 .text : SUBALIGN(4) { ... }
ONLY_IF_RO ONLY_IF_RW \xA6 Create the output section only if all inputs are read-only / read-write
NOLOAD \xA6 Section type: allocates address space but has no contents in the file (e.g. .bss, a stack, noinit RAM) \xA6 .bss (NOLOAD) : { ... }
DSECT COPY INFO \xA6 Legacy section types: not allocated in memory
READONLY \xA6 Section type: read-only
TYPE \xA6 Section type from a number or SHT_ name \xA6 (TYPE = SHT_PROGBITS)
FILEHDR \xA6 PHDRS: include the ELF file header in this segment
FLAGS \xA6 PHDRS: segment flags (p_flags) \xA6 FLAGS(5)
PT_NULL PT_LOAD PT_DYNAMIC PT_INTERP PT_NOTE PT_SHLIB PT_PHDR PT_TLS PT_GNU_EH_FRAME PT_GNU_STACK PT_GNU_RELRO PT_GNU_PROPERTY \xA6 ELF program header (segment) type
/DISCARD/ \xA6 Special output section: input sections placed here are dropped from the output \xA6 /DISCARD/ : { *(.comment) *(.ARM.exidx*) }
`);
var FUNCTIONS = docTable(`
ABSOLUTE \xA6 Absolute (non-section-relative) value of an expression \xA6 ABSOLUTE(exp)
ADDR \xA6 Run address (VMA) of an output section \xA6 ADDR(.data)
ALIGN \xA6 Round the location counter (or exp) up to a power-of-two alignment \xA6 . = ALIGN(8); / ALIGN(exp, align)
ALIGNOF \xA6 Alignment of an output section \xA6 ALIGNOF(.data)
BLOCK \xA6 Old synonym for ALIGN
DATA_SEGMENT_ALIGN DATA_SEGMENT_END DATA_SEGMENT_RELRO_END \xA6 Page-align the data segment for shared objects and executables
DEFINED \xA6 1 if the symbol is defined, else 0 \xA6 DEFINED(_stack_size) ? _stack_size : 0x400
LENGTH \xA6 Size of a memory region (in MEMORY: LENGTH = size, also len / l) \xA6 LENGTH(RAM)
LOADADDR \xA6 Load address (LMA) of an output section: where startup code copies .data from \xA6 _sidata = LOADADDR(.data);
LOG2CEIL \xA6 Ceiling of log2 \xA6 LOG2CEIL(exp)
MAX MIN \xA6 Maximum / minimum of two expressions \xA6 MAX(a, b)
NEXT \xA6 Next unallocated address that is a multiple of exp
ORIGIN \xA6 Start address of a memory region (in MEMORY: ORIGIN = address, also org / o) \xA6 ORIGIN(RAM)
SEGMENT_START \xA6 Segment base address, overridable with -T options \xA6 SEGMENT_START("text-segment", 0x400000)
SIZEOF \xA6 Size in bytes of an output section \xA6 SIZEOF(.bss)
SIZEOF_HEADERS \xA6 Size of the ELF file and program headers
CONSTANT \xA6 Target constant: MAXPAGESIZE or COMMONPAGESIZE \xA6 CONSTANT(MAXPAGESIZE)
MAXPAGESIZE COMMONPAGESIZE \xA6 Target page sizes, used with CONSTANT()
`);
function describeLinker(text, kind) {
  if (kind === "keyword") {
    const e = KEYWORDS2.get(text);
    return e && { title: text, tag: "Linker script command", ...e };
  }
  if (kind === "function") {
    const e = FUNCTIONS.get(text);
    return e && { title: text, tag: "Linker script function", ...e };
  }
  if (kind === "variable" && text === ".") {
    return {
      title: ".",
      tag: "Linker script",
      summary: "Location counter: the current address. Assigning to it moves the output position forward",
      syntax: ". = ALIGN(4); _sbss = .; . += 0x400;"
    };
  }
  if (kind === "operator" && text === ">") {
    return { title: ">", tag: "Linker script", summary: "Place this output section in a memory region (its run address, VMA). AT> sets the load region (LMA)", syntax: ".data : { ... } > RAM AT> FLASH" };
  }
  return void 0;
}

// src/lang/linker.ts
var KEYWORDS3 = new Set(words(`
  ENTRY INCLUDE INPUT GROUP AS_NEEDED OUTPUT SEARCH_DIR STARTUP OUTPUT_FORMAT OUTPUT_ARCH TARGET
  REGION_ALIAS ASSERT EXTERN FORCE_COMMON_ALLOCATION INHIBIT_COMMON_ALLOCATION FORCE_GROUP_ALLOCATION
  INSERT AFTER BEFORE NOCROSSREFS NOCROSSREFS_TO LD_FEATURE
  SECTIONS MEMORY PHDRS VERSION OVERLAY
  HIDDEN PROVIDE PROVIDE_HIDDEN KEEP EXCLUDE_FILE INPUT_SECTION_FLAGS
  SORT SORT_BY_NAME SORT_BY_ALIGNMENT SORT_BY_INIT_PRIORITY SORT_NONE REVERSE
  FILL CREATE_OBJECT_SYMBOLS CONSTRUCTORS COMMON
  BYTE SHORT LONG QUAD SQUAD ASCIZ
  AT ALIGN_WITH_INPUT SUBALIGN ONLY_IF_RO ONLY_IF_RW
  NOLOAD DSECT COPY INFO READONLY TYPE
  FILEHDR FLAGS PT_NULL PT_LOAD PT_DYNAMIC PT_INTERP PT_NOTE PT_SHLIB PT_PHDR PT_TLS
  PT_GNU_EH_FRAME PT_GNU_STACK PT_GNU_RELRO PT_GNU_PROPERTY
`));
var FUNCTIONS2 = new Set(words(`
  ABSOLUTE ADDR ALIGN ALIGNOF BLOCK DATA_SEGMENT_ALIGN DATA_SEGMENT_END DATA_SEGMENT_RELRO_END
  DEFINED LENGTH LOADADDR LOG2CEIL MAX MIN NEXT ORIGIN SEGMENT_START SIZEOF SIZEOF_HEADERS
  CONSTANT MAXPAGESIZE COMMONPAGESIZE
`));
var NUMBER2 = /^(?:0x[0-9a-f]+|0b[01]+|\d+)[kmg]?\b/i;
var PREPROC2 = /^#\s*(?:include|define|undef|if|ifdef|ifndef|elif|else|endif|error|pragma)\b/;
var ASSIGN_OP = /^(?:<<|>>|[-+*/&|])?=(?!=)/;
function makeLinkerParser() {
  return {
    startState: () => ({ inBlockComment: false, depth: 0, regionNext: false }),
    copyState: (s) => ({ ...s }),
    token(stream, s) {
      if (s.inBlockComment) {
        if (stream.match(/^.*?\*\//)) s.inBlockComment = false;
        else stream.skipToEnd();
        return "comment";
      }
      if (stream.eatSpace()) return null;
      if (stream.match("/*")) {
        if (!stream.match(/^.*?\*\//)) {
          s.inBlockComment = true;
          stream.skipToEnd();
        }
        return "comment";
      }
      if (stream.sol() && stream.match(PREPROC2)) {
        stream.skipToEnd();
        return "directive";
      }
      if (stream.match(/^"(?:[^"\\]|\\.)*"?/)) return "string";
      if (stream.match("/DISCARD/")) return "keyword";
      if (stream.match(NUMBER2)) return "number";
      if (stream.match(/^[a-z_.$][\w.$]*/i)) {
        const word = stream.current();
        const regionNext = s.regionNext;
        s.regionNext = false;
        if (KEYWORDS3.has(word)) return "keyword";
        if (FUNCTIONS2.has(word)) return "function";
        if (word === "." || stream.match(/^\s*(?:<<|>>|[-+*/&|])?=(?!=)/, false)) return "variable";
        if (regionNext || word.startsWith(".")) return "label";
        if (s.depth === 0 && stream.match(/^\s*(?:\([^)]*\))?\s*:/, false)) return "label";
        return null;
      }
      if (stream.match(/^(?:==|!=|<=|>=|<<|>>|&&|\|\|)/)) return null;
      if (stream.match(ASSIGN_OP)) return "operator";
      if (stream.match(">")) {
        if (s.depth > 0) return null;
        s.regionNext = true;
        return "operator";
      }
      if (stream.match("(")) s.depth++;
      else if (stream.match(")")) s.depth = Math.max(0, s.depth - 1);
      else stream.next();
      return null;
    }
  };
}
var LINKER = {
  id: "linker",
  name: "Linker script",
  aliases: ["ld", "lds", "linkerscript", "linker-script"],
  makeParser: makeLinkerParser,
  blockComment: ["/*", "*/"],
  describe: describeLinker
};

// src/docs/make.ts
var DIRECTIVES = docTable(`
include \xA6 Read other makefiles; fails if one is missing (and cannot be remade) \xA6 include file.mk $(DEPS)
-include sinclude \xA6 Like include, but missing files are ignored (typical for generated .d dependency files) \xA6 -include $(OBJS:.o=.d)
define \xA6 Define a multi-line variable (canned recipe or template for $(call) / $(eval)) \xA6 define NAME = ... endef
endef \xA6 Ends a define block \xA6 endef
undefine \xA6 Make a variable undefined \xA6 undefine NAME
ifdef \xA6 Conditional: true if the variable has a non-empty value \xA6 ifdef DEBUG ... else ... endif
ifndef \xA6 Conditional: true if the variable is undefined or empty \xA6 ifndef CROSS_COMPILE
ifeq \xA6 Conditional: true if both expanded arguments are equal \xA6 ifeq ($(ARCH),arm) / ifeq "a" "b"
ifneq \xA6 Conditional: true if the expanded arguments differ \xA6 ifneq ($(V),1)
else \xA6 Alternative branch of a conditional; can chain: else ifeq (...) \xA6 else
endif \xA6 Ends a conditional \xA6 endif
export \xA6 Pass a variable to sub-makes and recipe shells through the environment \xA6 export VAR / export VAR = value
unexport \xA6 Stop exporting a variable \xA6 unexport VAR
override \xA6 Set a variable even if it was given on the command line \xA6 override CFLAGS += -g
private \xA6 Variable is not inherited by prerequisites (target-specific variables) \xA6 prog: private CFLAGS = -O0
vpath \xA6 Directories to search for prerequisites matching a pattern \xA6 vpath %.c src
`);
var FUNCTIONS3 = docTable(`
subst \xA6 Replace every occurrence of a string \xA6 $(subst from,to,text)
patsubst \xA6 Replace words matching a % pattern \xA6 $(patsubst %.c,%.o,$(SRCS)) \xA6 shorthand: $(SRCS:%.c=%.o)
strip \xA6 Remove leading/trailing whitespace and collapse internal spaces \xA6 $(strip text)
findstring \xA6 Returns find if it occurs in text, else empty \xA6 $(findstring find,text)
filter \xA6 Keep words matching any pattern \xA6 $(filter %.c %.s,$(FILES))
filter-out \xA6 Remove words matching any pattern \xA6 $(filter-out main.o,$(OBJS))
sort \xA6 Sort words lexically and remove duplicates \xA6 $(sort list)
word \xA6 The n-th word (1-based) \xA6 $(word n,text)
wordlist \xA6 Words s through e \xA6 $(wordlist s,e,text)
words \xA6 Number of words \xA6 $(words text)
firstword lastword \xA6 First / last word \xA6 $(firstword text)
dir \xA6 Directory part of each file name (up to the last /) \xA6 $(dir src/a.c) \u2192 src/
notdir \xA6 Strip the directory part \xA6 $(notdir src/a.c) \u2192 a.c
suffix \xA6 Suffix of each file name \xA6 $(suffix a.c b.o) \u2192 .c .o
basename \xA6 File names without suffix \xA6 $(basename src/a.c) \u2192 src/a
addsuffix \xA6 Append a suffix to each word \xA6 $(addsuffix .o,a b) \u2192 a.o b.o
addprefix \xA6 Prepend a prefix to each word \xA6 $(addprefix build/,a.o b.o)
join \xA6 Pairwise concatenate two lists \xA6 $(join a b,.c .o) \u2192 a.c b.o
wildcard \xA6 File names matching a shell glob that exist now \xA6 $(wildcard src/*.c)
realpath \xA6 Canonical absolute path (resolves symlinks; empty if missing) \xA6 $(realpath file)
abspath \xA6 Absolute path without resolving symlinks \xA6 $(abspath file)
error \xA6 Stop make with a fatal error message \xA6 $(error CROSS_COMPILE not set)
warning \xA6 Print a warning with file and line \xA6 $(warning text)
info \xA6 Print a message (handy for debugging variables) \xA6 $(info OBJS=$(OBJS))
shell \xA6 Run a shell command and capture its output (newlines \u2192 spaces) \xA6 $(shell git rev-parse --short HEAD)
origin \xA6 Where a variable came from: undefined, default, environment, file, command line, override, automatic \xA6 $(origin CC)
flavor \xA6 Variable flavor: undefined, recursive or simple \xA6 $(flavor VAR)
foreach \xA6 Expand text once per word \xA6 $(foreach d,$(DIRS),$(wildcard $(d)/*.c))
if \xA6 Conditional expansion: non-empty condition selects then-part \xA6 $(if cond,then,else)
or and \xA6 Short-circuit OR / AND over expanded arguments \xA6 $(or $(A),$(B))
intcmp \xA6 Compare integers (GNU make 4.4) \xA6 $(intcmp a,b,lt,eq,gt)
call \xA6 Call a user-defined function; parameters are $(1), $(2), ... \xA6 $(call fn,arg1,arg2)
eval \xA6 Parse text as makefile syntax (generate rules from templates) \xA6 $(eval $(call RULE,name))
file \xA6 Write or read a file \xA6 $(file >out.txt,text)
value \xA6 Value of a variable without expanding it \xA6 $(value VAR)
let \xA6 Bind local variables (GNU make 4.4) \xA6 $(let a b,list,text)
guile \xA6 Evaluate GNU Guile code (if built with Guile) \xA6 $(guile expr)
`);
var SPECIAL_TARGETS = docTable(`
.PHONY \xA6 Prerequisites are not files: always run their recipes (all, clean, flash ...)
.SUFFIXES \xA6 Suffix list for old-style suffix rules; an empty .SUFFIXES: disables them
.DEFAULT \xA6 Recipe used for targets with no rule
.PRECIOUS \xA6 Don't delete these targets if make is interrupted, or if they are intermediate
.INTERMEDIATE \xA6 Treat as intermediate: deleted after use
.NOTINTERMEDIATE \xA6 Never treat as intermediate
.SECONDARY \xA6 Intermediate but never deleted automatically
.SECONDEXPANSION \xA6 Expand prerequisite lists a second time, so $$@ etc. work there
.DELETE_ON_ERROR \xA6 Delete a target whose recipe fails (recommended in every makefile)
.IGNORE \xA6 Ignore errors in recipes of these targets
.LOW_RESOLUTION_TIME \xA6 Targets whose timestamps have 1-second resolution
.SILENT \xA6 Don't echo recipes of these targets (like @)
.EXPORT_ALL_VARIABLES \xA6 Export every variable to child processes
.NOTPARALLEL \xA6 Run this makefile serially even with -j
.ONESHELL \xA6 Run each recipe in a single shell instead of one per line
.POSIX \xA6 POSIX-conforming mode
.WAIT \xA6 In a prerequisite list, wait for the earlier ones before starting the later ones (with -j)
`);
var VARIABLES = docTable(`
@ \xA6 Automatic: the target of the rule \xA6 $@
< \xA6 Automatic: the first prerequisite \xA6 $<
^ \xA6 Automatic: all prerequisites, duplicates removed \xA6 $^
+ \xA6 Automatic: all prerequisites, keeping duplicates (link order) \xA6 $+
? \xA6 Automatic: prerequisites newer than the target \xA6 $?
* \xA6 Automatic: the stem matched by % in a pattern rule \xA6 $*
| \xA6 Automatic: the order-only prerequisites \xA6 $|
% \xA6 Automatic: archive member name for lib.a(member) targets \xA6 $%
@D @F \xA6 Automatic: directory / file part of $@ \xA6 $(@D)
<D <F \xA6 Automatic: directory / file part of $< \xA6 $(<D)
$ \xA6 A literal $ (passed to the shell, e.g. $$i in a for loop) \xA6 $$
CC \xA6 C compiler (default cc); for cross builds e.g. arm-none-eabi-gcc \xA6 $(CC)
CXX \xA6 C++ compiler (default g++) \xA6 $(CXX)
AS \xA6 Assembler (default as) \xA6 $(AS)
LD \xA6 Linker \xA6 $(LD)
AR \xA6 Archiver for static libraries (default ar) \xA6 $(AR) rcs lib.a $^
OBJCOPY \xA6 Convention: objcopy, e.g. to make a raw .bin or .hex for flashing \xA6 $(OBJCOPY) -O binary $< $@
OBJDUMP \xA6 Convention: objdump, e.g. -d for a disassembly listing \xA6 $(OBJDUMP) -d $<
SIZE \xA6 Convention: size tool, shows text/data/bss usage \xA6 $(SIZE) $<
CROSS_COMPILE \xA6 Convention (Linux, U-Boot): toolchain prefix such as riscv64-linux-gnu- \xA6 $(CROSS_COMPILE)gcc
CFLAGS \xA6 Extra flags for the C compiler \xA6 CFLAGS += -O2 -Wall
CXXFLAGS \xA6 Extra flags for the C++ compiler
CPPFLAGS \xA6 Extra flags for the C preprocessor (-I, -D)
ASFLAGS \xA6 Extra flags for the assembler
LDFLAGS \xA6 Extra flags for the linker, such as -L and -T script.ld
LDLIBS \xA6 Libraries to link (-lm ...), placed after the objects
ARFLAGS \xA6 Flags for ar (default rv)
MAKE \xA6 The make program itself; use $(MAKE) for recursive make so -j and flags propagate \xA6 $(MAKE) -C subdir
MAKEFLAGS \xA6 Flags passed to sub-makes
MAKECMDGOALS \xA6 Targets given on the command line
CURDIR \xA6 Current working directory of make
SHELL \xA6 Shell used for recipes (default /bin/sh)
RM \xA6 Command to remove files (default rm -f)
VPATH \xA6 Directories to search for prerequisites
.DEFAULT_GOAL \xA6 Target built when none is given (default: first target)
.RECIPEPREFIX \xA6 Character that starts recipe lines (default tab)
`);
var OPERATORS = docTable(`
= \xA6 Recursively expanded: the value is expanded every time the variable is used
:= ::= \xA6 Simply expanded: the value is expanded once, right here
:::= \xA6 Immediately expanded, but stored as a recursive variable (POSIX)
+= \xA6 Append to the variable (keeps its flavor)
?= \xA6 Set only if the variable is not already defined
!= \xA6 Run the value as a shell command and assign its output
: \xA6 Rule: targets : prerequisites, followed by tab-indented recipe lines
:: \xA6 Double-colon rule: each rule for the target has its own independent recipe
&: \xA6 Grouped targets: one recipe run produces all the targets
| \xA6 Order-only prerequisites follow: they must exist but don't trigger a rebuild when newer
; \xA6 Inline recipe on the rule line
@ \xA6 Recipe prefix: don't echo this command
- \xA6 Recipe prefix: ignore errors from this command
+ \xA6 Recipe prefix: run even with make -n (dry run)
`);
function lookup2(tag, title, map, key) {
  const e = map.get(key);
  return e && { title, tag, ...e };
}
function describeMake(text, kind) {
  switch (kind) {
    case "keyword":
      return lookup2("Make directive", text, DIRECTIVES, text);
    case "function":
      return lookup2("Make function", text, FUNCTIONS3, text.replace(/^\$[({]/, ""));
    case "directive":
      return lookup2("Make special target", text, SPECIAL_TARGETS, text);
    case "variable": {
      const key = text.startsWith("$$") ? "$" : text.replace(/^\$[({]?/, "").replace(/[)}]$/, "");
      return lookup2("Make variable", text, VARIABLES, key);
    }
    case "operator": {
      const prefixes = /^[@+-]{2,}$/.test(text) ? [...text].map((c) => OPERATORS.get(c).summary) : void 0;
      if (prefixes) return { title: text, tag: "Make operator", summary: prefixes.join("; ") };
      return lookup2("Make operator", text, OPERATORS, text);
    }
    default:
      return void 0;
  }
}

// src/lang/makefile.ts
var DIRECTIVES2 = new Set(words(`
  include -include sinclude define endef undefine ifdef ifndef ifeq ifneq else endif
  export unexport override private vpath
`));
var FUNCTIONS4 = new Set(words(`
  subst patsubst strip findstring filter filter-out sort word wordlist words firstword lastword
  dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath
  error warning info shell origin flavor foreach if or and intcmp call eval file value let guile
`));
var SPECIAL_TARGETS2 = new Set(words(`
  .PHONY .SUFFIXES .DEFAULT .PRECIOUS .INTERMEDIATE .NOTINTERMEDIATE .SECONDARY .SECONDEXPANSION
  .DELETE_ON_ERROR .IGNORE .LOW_RESOLUTION_TIME .SILENT .EXPORT_ALL_VARIABLES .NOTPARALLEL
  .ONESHELL .POSIX .WAIT
`));
var ASSIGN = /^(?:(?:export|override|private|unexport)\s+)*[^\s:#=+?!$]+\s*(?::{1,3}|[+?!])?=/;
var ASSIGN_OP2 = /^(?::{1,3}|[+?!])?=/;
var ODD_TRAILING_BACKSLASH = /(?:^|[^\\])(?:\\\\)*\\$/;
function stripRefs(line) {
  let prev;
  do {
    prev = line;
    line = line.replace(/\$[({][^$(){}]*[)}]/g, "x");
  } while (line !== prev);
  return line;
}
function startLine(line, s) {
  var _a, _b;
  const continued = s.continues;
  s.continues = ODD_TRAILING_BACKSLASH.test(line);
  s.lineStart = !continued;
  if (continued && s.mode !== "define") return;
  s.pastOp = false;
  s.depth = 0;
  if (s.inDefine) {
    if (/^\s*endef\b/.test(line)) {
      s.inDefine = false;
      s.mode = "other";
    } else s.mode = "define";
    return;
  }
  const trimmed = line.replace(/^\s+/, "");
  const first = (_b = (_a = /^[-\w]+/.exec(trimmed)) == null ? void 0 : _a[0]) != null ? _b : "";
  const isDirective = DIRECTIVES2.has(first) && /^(?:\s|\(|$)/.test(trimmed.slice(first.length));
  if (!trimmed || trimmed.startsWith("#")) {
    s.mode = "other";
    return;
  }
  if (s.inRule && trimmed !== line && !isDirective) {
    s.mode = "recipe";
    return;
  }
  if (ASSIGN.test(trimmed)) {
    s.mode = "assign";
    s.inRule = false;
    return;
  }
  if (first === "define") {
    s.mode = "assign";
    s.inDefine = true;
    s.inRule = false;
    return;
  }
  if (isDirective) {
    s.mode = "other";
    return;
  }
  if (/^[^#=]*:(?!=)/.test(stripRefs(trimmed))) {
    s.mode = "rule";
    s.inRule = true;
    return;
  }
  s.mode = "other";
  s.inRule = false;
}
function reference(stream, s) {
  const fn = stream.match(/^\$[({]([a-z-]+)(?=\s)/, false);
  if (fn && FUNCTIONS4.has(fn[1])) {
    stream.match(fn[0]);
    s.depth++;
    return "function";
  }
  if (stream.match(/^\$[({][^\s$(){}:=#]*/)) {
    if (!stream.match(/^[)}]/)) s.depth++;
    return "variable";
  }
  if (stream.match(/^\$\$[a-z_]\w*/i) || stream.match(/^\$[^\s]/)) return "variable";
  stream.next();
  return null;
}
function makeMakefileParser() {
  return {
    startState: () => ({
      mode: "other",
      pastOp: false,
      depth: 0,
      inRule: false,
      inDefine: false,
      continues: false,
      lineStart: true
    }),
    copyState: (s) => ({ ...s }),
    token(stream, s) {
      if (stream.sol()) startLine(stream.string, s);
      if (stream.eatSpace()) return null;
      const lineStart = s.lineStart;
      s.lineStart = false;
      if (stream.peek() === "$") return reference(stream, s);
      if (stream.match(/^\\./)) return null;
      if (s.depth > 0) {
        if (stream.match(/^[({]/)) {
          s.depth++;
          return null;
        }
        if (stream.match(/^[)}]/)) {
          s.depth--;
          return null;
        }
      }
      if (s.mode === "define") {
        stream.match(/^[^$\\]+/) || stream.next();
        return null;
      }
      if (stream.match("#")) {
        stream.skipToEnd();
        return "comment";
      }
      if (s.mode === "recipe") {
        if (lineStart && stream.match(/^[@+-]+/)) return "operator";
        if (stream.match(/^"(?:[^"\\]|\\.)*"?/) || stream.match(/^'[^']*'?/)) return "string";
        stream.match(/^[^\s$"'\\(){}]+/) || stream.next();
        return null;
      }
      if (s.mode === "rule" && s.depth === 0) {
        if (!s.pastOp) {
          if (stream.match(/^(?:::?|&:)/)) {
            s.pastOp = true;
            return "operator";
          }
          if (stream.match(/^[^\s:#;=$|\\(){}]+/)) {
            return SPECIAL_TARGETS2.has(stream.current()) ? "directive" : "label";
          }
        } else {
          if (stream.match(/^[|;]/)) {
            if (stream.current() === ";") s.mode = "recipe";
            return "operator";
          }
          if (stream.match(ASSIGN, false)) {
            s.mode = "assign";
            s.pastOp = false;
          }
        }
      }
      if (s.mode === "assign" && !s.pastOp && s.depth === 0) {
        if (stream.match(ASSIGN_OP2)) {
          s.pastOp = true;
          return "operator";
        }
        if (stream.match(/^[^\s:#=+?!$\\(){}]+/)) {
          return DIRECTIVES2.has(stream.current()) ? "keyword" : "variable";
        }
      }
      if (s.mode === "other" && lineStart && stream.match(/^[-\w]+/)) {
        const word = stream.current();
        if (word === "else") s.lineStart = true;
        return DIRECTIVES2.has(word) ? "keyword" : null;
      }
      stream.match(/^[^\s$#\\(){}:=|;]+/) || stream.next();
      return null;
    }
  };
}
var MAKEFILE = {
  id: "makefile",
  name: "Makefile",
  aliases: ["make", "mk", "mak"],
  makeParser: makeMakefileParser,
  lineComment: "#",
  describe: describeMake
};

// src/tokenizer/parser.ts
var NUMBER3 = /^-?(?:0x[0-9a-f]+|0b[01]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)(?:[ul]{1,3})?\b/i;
var PREPROC3 = /^#(?:include|define|undef|if|ifdef|ifndef|elif|else|endif)\b/;
function makeParser(isa) {
  return {
    startState: () => ({ inBlockComment: false, sawMnemonic: false }),
    copyState: (s) => ({ ...s }),
    token(stream, state) {
      if (stream.sol()) state.sawMnemonic = false;
      if (state.inBlockComment) {
        if (stream.match(/^.*?\*\//)) state.inBlockComment = false;
        else stream.skipToEnd();
        return "comment";
      }
      if (stream.eatSpace()) return null;
      if (stream.match("/*")) {
        if (!stream.match(/^.*?\*\//)) {
          state.inBlockComment = true;
          stream.skipToEnd();
        }
        return "comment";
      }
      if (!state.sawMnemonic && stream.match(PREPROC3)) {
        stream.skipToEnd();
        return "directive";
      }
      for (const c of isa.lineComments) {
        if (stream.match(c)) {
          stream.skipToEnd();
          return "comment";
        }
      }
      if (stream.match(/^"(?:[^"\\]|\\.)*"?/)) return "string";
      if (stream.match(/^%[a-z_]+(?=\()/i)) return "reloc";
      if (stream.match(/^:[a-z_0-9]+:/i)) return "reloc";
      if (isa.hashIsImmediate && stream.match("#")) {
        stream.match(NUMBER3);
        return "number";
      }
      if (!state.sawMnemonic && stream.match(/^\d+:/)) return "label";
      if (stream.match(/^\d+[fb]\b/i)) return "label";
      if (stream.match(NUMBER3)) return "number";
      if (stream.match(/^[.a-z_$][\w.$]*/i)) {
        const word = stream.current().toLowerCase();
        if (!state.sawMnemonic && stream.match(":")) return "label";
        if (word.startsWith(".")) {
          state.sawMnemonic = true;
          return "directive";
        }
        if (!state.sawMnemonic) {
          state.sawMnemonic = true;
          return isa.isMnemonic(word) ? "mnemonic" : null;
        }
        return isRegister(isa.registers, word) ? "register" : null;
      }
      stream.next();
      return null;
    }
  };
}
function asmLanguage(isa) {
  var _a;
  return {
    id: isa.id,
    name: isa.name,
    aliases: isa.aliases,
    makeParser: () => makeParser(isa),
    lineComment: isa.lineComments[0],
    blockComment: ["/*", "*/"],
    describe: (_a = isa.describe) == null ? void 0 : _a.bind(isa)
  };
}

// src/lang/objdump.ts
var ISAS = ALL_ISAS;
var PARSERS = ISAS.map(makeParser);
var FALLBACK = ISAS.findIndex((i) => i.id === "riscv");
var FILE_FORMAT = /:\s+file format\s+(\S+)/;
var SECTION = /^\s*(?:Disassembly of section\b|Dump of assembler code\b|End of assembler dump)/;
var SYMBOL = /^\s*(?:0x)?[0-9a-f]+\s+<[^>]*>:\s*$/i;
var INSN = /^\s*(?:=>\s*)?(?:0x)?[0-9a-f]+(?:\s*<[^>]*>)?:/i;
var BYTES = /^(?:[0-9a-f]{2})+(?: (?:[0-9a-f]{2})+)*(?= *\t| {2,}|\s*$)/i;
function isaFromFormat(format) {
  const f = format.toLowerCase();
  const id = f.includes("riscv") ? "riscv" : f.includes("aarch64") ? "arm64" : /(little|big)arm/.test(f) ? "arm32" : void 0;
  return id ? ISAS.findIndex((i) => i.id === id) : -1;
}
function isaFromMnemonic(word) {
  const hits = ISAS.map((isa, i) => isa.isMnemonic(word.toLowerCase()) ? i : -1).filter((i) => i >= 0);
  return hits.length === 1 ? hits[0] : -1;
}
function startLine2(line, s) {
  if (FILE_FORMAT.test(line)) {
    s.phase = "header";
    const isa = isaFromFormat(FILE_FORMAT.exec(line)[1]);
    if (isa >= 0 && s.isa < 0) s.isa = isa;
  } else if (SECTION.test(line)) s.phase = "section";
  else if (SYMBOL.test(line)) s.phase = "symbol";
  else if (INSN.test(line)) s.phase = "address";
  else s.phase = "plain";
}
function makeObjdumpParser(forced = -1) {
  return {
    startState: () => ({ isa: forced, inner: PARSERS.map((p) => p.startState()), phase: "plain", tokenIsa: -1 }),
    copyState: (s) => ({ ...s, inner: s.inner.map((st, i) => PARSERS[i].copyState(st)) }),
    tokenLang: (s) => s.tokenIsa >= 0 ? ISAS[s.tokenIsa].id : void 0,
    token(stream, s) {
      s.tokenIsa = -1;
      if (stream.sol()) startLine2(stream.string, s);
      switch (s.phase) {
        case "plain":
          stream.skipToEnd();
          return null;
        case "header":
          stream.skipToEnd();
          return "comment";
        case "section":
          stream.skipToEnd();
          return "directive";
        case "symbol":
          if (stream.eatSpace()) return null;
          if (stream.match(/^(?:0x)?[0-9a-f]+/i)) return "number";
          stream.skipToEnd();
          return "label";
        case "address":
          if (stream.eatSpace()) return null;
          if (stream.match("=>")) return "operator";
          if (stream.match(/^(?:0x)?[0-9a-f]+/i)) return "number";
          if (stream.match(/^<[^>]*>/)) return "label";
          stream.next();
          s.phase = "bytes";
          return null;
        case "bytes":
          if (stream.eatSpace()) return null;
          s.phase = "insn";
          s.inner.forEach((st) => {
            st.sawMnemonic = false;
          });
          if (stream.match(BYTES)) return "comment";
          break;
      }
      if (stream.match(/^<[^>\s]*>/)) return "label";
      if (s.isa < 0 && !s.inner[FALLBACK].sawMnemonic) {
        const word = stream.match(/^[a-z][\w.]*/i, false);
        if (word) s.isa = isaFromMnemonic(word[0]);
      }
      const isa = s.isa >= 0 ? s.isa : FALLBACK;
      s.tokenIsa = isa;
      return PARSERS[isa].token(stream, s.inner[isa]);
    }
  };
}
function objdumpLanguage(id, name, aliases, isaId) {
  const forced = isaId ? ISAS.findIndex((i) => i.id === isaId) : -1;
  return { id, name, aliases, makeParser: () => makeObjdumpParser(forced) };
}
var OBJDUMP_LANGUAGES = [
  objdumpLanguage("objdump", "Disassembly", ["disasm", "disassembly"]),
  objdumpLanguage("objdump-riscv", "Disassembly (RISC-V)", ["disasm-riscv", "objdump-rv"], "riscv"),
  objdumpLanguage("objdump-arm", "Disassembly (ARM)", ["disasm-arm", "objdump-arm32", "objdump-thumb"], "arm32"),
  objdumpLanguage("objdump-arm64", "Disassembly (AArch64)", ["disasm-arm64", "objdump-aarch64"], "arm64")
];

// src/docs/verilog.ts
var KEYWORDS4 = docTable(`
module macromodule \xA6 Declare a module: a hardware block with ports, instantiated by name in other modules \xA6 module counter #(parameter W = 8) (input logic clk, output logic [W-1:0] q); ... endmodule
endmodule \xA6 Ends a module
input \xA6 Input port
output \xA6 Output port
inout \xA6 Bidirectional port (tri-state pins)
wire \xA6 Net: driven continuously by assign statements or module outputs; holds no value of its own \xA6 wire [7:0] sum = a + b;
reg \xA6 Variable assigned in always/initial blocks. Despite the name it is not necessarily a flip-flop: that depends on how it is assigned \xA6 reg [3:0] count;
logic \xA6 SystemVerilog 4-state type usable both as a variable and (with one driver) as a net; replaces most reg/wire \xA6 logic [7:0] data;
bit \xA6 SystemVerilog 2-state (0/1) type; X and Z become 0
byte shortint int longint \xA6 SystemVerilog 2-state signed integers of 8 / 16 / 32 / 64 bits
integer \xA6 4-state signed 32-bit variable
real realtime shortreal \xA6 Floating-point variable (simulation only)
time \xA6 64-bit unsigned simulation time variable
string \xA6 SystemVerilog dynamic string (simulation)
tri wand wor triand trior tri0 tri1 trireg uwire supply0 supply1 \xA6 Net types: tri-state, wired-AND/OR, pulled, single-driver (uwire) or constant supply
signed unsigned \xA6 Arithmetic is signed / unsigned; mixing a signed and an unsigned operand makes the whole expression unsigned \xA6 logic signed [15:0] s;
always \xA6 Block that re-runs whenever its event control triggers. With @(posedge clk) it describes flip-flops, with @(*) combinational logic \xA6 always @(posedge clk) q <= d;
always_ff \xA6 SystemVerilog: sequential logic block; tools check it infers flip-flops. Use nonblocking <= inside \xA6 always_ff @(posedge clk or negedge rst_n) if (!rst_n) q <= '0; else q <= d;
always_comb \xA6 SystemVerilog: combinational logic block; sensitivity is inferred and tools warn about latches. Use blocking = inside \xA6 always_comb y = sel ? a : b;
always_latch \xA6 SystemVerilog: intentional latch \xA6 always_latch if (en) q = d;
initial \xA6 Runs once at time 0. Testbenches; in FPGA synthesis it can set register power-up values \xA6 initial begin clk = 0; forever #5 clk = ~clk; end
final \xA6 SystemVerilog: runs once when simulation ends
assign \xA6 Continuous assignment: the net always equals the expression (combinational logic) \xA6 assign y = a & b;
deassign force release \xA6 Procedural override of a variable or net (testbenches)
posedge \xA6 Rising edge (0\u21921, also from/to X/Z) \xA6 @(posedge clk)
negedge \xA6 Falling edge \xA6 @(negedge rst_n)
edge \xA6 Either edge
or \xA6 In an event list: either event (same as ,). Elsewhere: OR gate primitive \xA6 @(posedge clk or negedge rst_n)
and nand nor xor xnor not buf \xA6 Gate primitive \xA6 and g1 (y, a, b);
begin \xA6 Starts a sequential block; may be named: begin : name \xA6 begin ... end
end \xA6 Ends a begin block
if else \xA6 Conditional. In combinational logic, a missing else (or unassigned signal in a branch) infers a latch \xA6 if (en) q <= d; else q <= q;
case \xA6 Multi-way branch on exact value matches (X and Z must match exactly) \xA6 case (state) IDLE: ...; default: ...; endcase
casez \xA6 case where Z or ? bits in items are don't-care \xA6 casez (req) 4'b1???: grant = 0; ...
casex \xA6 case where X and Z are don't-care on both sides; avoid in synthesis code (hides X bugs)
endcase \xA6 Ends a case
default \xA6 Case item for any other value; also a default for clocking/disable iff
unique \xA6 SystemVerilog: exactly one case item/if branch matches; warns otherwise and lets synthesis build parallel logic \xA6 unique case (sel) ...
unique0 \xA6 SystemVerilog: at most one case item matches
priority \xA6 SystemVerilog: at least one item matches; first match wins
for \xA6 Loop; in synthesizable code it unrolls into parallel hardware \xA6 for (int i = 0; i < 8; i++) ...
while do repeat forever \xA6 Loops (mostly testbench code) \xA6 forever #5 clk = ~clk;
foreach \xA6 SystemVerilog: loop over array indices \xA6 foreach (mem[i]) mem[i] = '0;
break continue return \xA6 SystemVerilog: leave a loop / next iteration / return from a function
parameter \xA6 Module constant that can be overridden per instance \xA6 module fifo #(parameter DEPTH = 16) ... / fifo #(.DEPTH(32)) u_fifo (...);
localparam \xA6 Module constant that cannot be overridden \xA6 localparam AW = $clog2(DEPTH);
defparam \xA6 Override a parameter by hierarchical name (deprecated; use #(...) instead)
generate \xA6 Region for generate-for / generate-if: replicate or conditionally include hardware at elaboration \xA6 generate for (genvar i = 0; i < N; i++) begin : g ... end endgenerate
endgenerate \xA6 Ends a generate region
genvar \xA6 Loop variable of a generate-for
function \xA6 Function: computes a value in zero time; no delays or event controls \xA6 function automatic logic [7:0] f(input logic [7:0] x); ...
endfunction \xA6 Ends a function
task \xA6 Task: may consume simulation time (delays, @); used in testbenches \xA6 task automatic send(input byte b); ...
endtask \xA6 Ends a task
automatic \xA6 Locals are allocated per call (needed for recursion and re-entrant tasks)
static \xA6 Locals are shared between calls (the Verilog default)
fork \xA6 Run the statements in parallel \xA6 fork ... join
join \xA6 Wait for all forked processes
join_any \xA6 Wait for the first forked process
join_none \xA6 Don't wait for forked processes
wait \xA6 Wait until a condition is true \xA6 wait (ready);
disable \xA6 Stop a named block or task
event \xA6 Named event: trigger with ->, wait with @
typedef \xA6 SystemVerilog: name a type \xA6 typedef logic [7:0] byte_t;
enum \xA6 SystemVerilog: enumerated type, e.g. FSM states \xA6 typedef enum logic [1:0] {IDLE, RUN, DONE} state_t;
struct \xA6 SystemVerilog: structure \xA6 typedef struct packed { logic [3:0] op; logic [11:0] imm; } instr_t;
union \xA6 SystemVerilog: union of types
packed \xA6 Fields/elements stored contiguously as one vector that can be sliced and assigned as bits
interface \xA6 SystemVerilog: bundle of signals (a bus) with optional modports, passed as one port \xA6 interface axi_if (input logic clk); ... endinterface
endinterface \xA6 Ends an interface
modport \xA6 SystemVerilog: direction view of an interface for one side \xA6 modport master (output valid, input ready);
package \xA6 SystemVerilog: shared types, parameters and functions \xA6 package cpu_pkg; ... endpackage
endpackage \xA6 Ends a package
import \xA6 Make package items visible \xA6 import cpu_pkg::*;
export \xA6 Re-export imported package items, or DPI export
class endclass extends virtual new this super \xA6 SystemVerilog classes (verification, UVM)
rand randc constraint solve dist inside \xA6 SystemVerilog constrained randomization
assert \xA6 SystemVerilog assertion: immediate (assert (x);) or concurrent (assert property (...)) \xA6 assert property (@(posedge clk) req |-> ##[1:3] ack);
assume cover expect restrict \xA6 SystemVerilog assertion statements (formal assumptions, coverage)
property endproperty sequence endsequence \xA6 SystemVerilog Assertions: named property / sequence
iff \xA6 Only if: @(posedge clk iff en) or disable iff (rst)
throughout within intersect first_match \xA6 SystemVerilog sequence operators
covergroup endgroup coverpoint cross bins \xA6 SystemVerilog functional coverage
clocking endclocking \xA6 SystemVerilog clocking block: testbench sampling/driving relative to a clock
program endprogram \xA6 SystemVerilog program block (testbench)
const \xA6 Constant variable
var \xA6 Declares a variable explicitly
void \xA6 No return value
ref \xA6 Argument passed by reference
specify endspecify specparam \xA6 Pin-to-pin timing (standard cell libraries)
primitive endprimitive table endtable \xA6 User-defined primitive (UDP)
`);
var SYSTEM_TASKS = docTable(`
$display \xA6 Print formatted text plus newline \xA6 $display("t=%0t q=%h", $time, q);
$write \xA6 Print formatted text without newline
$strobe \xA6 Print at the end of the time step (after nonblocking updates)
$monitor \xA6 Print whenever any argument changes \xA6 $monitor("%t a=%b", $time, a);
$finish \xA6 End the simulation \xA6 $finish;
$stop \xA6 Pause the simulation (interactive)
$time \xA6 Current simulation time (64-bit, scaled to the module's time unit)
$realtime \xA6 Current simulation time as real
$stime \xA6 Current simulation time, 32 bits
$clog2 \xA6 Ceiling of log2: number of address bits for N entries \xA6 localparam AW = $clog2(DEPTH);
$bits \xA6 Number of bits in a type or expression
$size $high $low $left $right $increment $dimensions \xA6 Array dimension queries
$signed $unsigned \xA6 Reinterpret as signed / unsigned \xA6 $signed(a) >>> 1
$readmemh $readmemb \xA6 Load a memory from a hex/binary text file (ROM contents, also synthesizable on FPGAs) \xA6 $readmemh("rom.hex", mem);
$writememh $writememb \xA6 Write a memory to a hex/binary text file
$dumpfile \xA6 VCD waveform output file \xA6 $dumpfile("wave.vcd");
$dumpvars \xA6 Dump signals to the VCD file (0 = all levels below) \xA6 $dumpvars(0, tb);
$random \xA6 32-bit signed random number
$urandom \xA6 SystemVerilog: 32-bit unsigned random number
$urandom_range \xA6 SystemVerilog: random number in a range \xA6 $urandom_range(0, 15)
$fopen $fclose \xA6 Open / close a file
$fdisplay $fwrite $fscanf $fgets $feof \xA6 File I/O
$sformatf \xA6 SystemVerilog: format into a string \xA6 $sformatf("%0d", n)
$sformat $swrite \xA6 Format into a string variable
$error $warning $info \xA6 SystemVerilog: report with severity (also inside assertions' else branch)
$fatal \xA6 SystemVerilog: report and end the simulation \xA6 $fatal(1, "bad state");
$countones \xA6 Number of 1 bits
$onehot \xA6 True if exactly one bit is 1
$onehot0 \xA6 True if at most one bit is 1
$isunknown \xA6 True if any bit is X or Z
$past \xA6 SVA: value in the previous clock cycle \xA6 $past(q)
$rose $fell \xA6 SVA: bit went 0\u21921 / 1\u21920 since the previous clock
$stable $changed \xA6 SVA: value same as / different from the previous clock
$value$plusargs $test$plusargs \xA6 Read +name=value simulator command-line arguments
$cast \xA6 SystemVerilog: checked type conversion
`);
var DIRECTIVES3 = docTable(`
\`define \xA6 Define a text macro (global, visible in files compiled later) \xA6 \`define WIDTH 8 / \`define MAX(a,b) ((a) > (b) ? (a) : (b))
\`undef \`undefineall \xA6 Remove one / all macro definitions
\`ifdef \`ifndef \`elsif \`else \`endif \xA6 Conditional compilation \xA6 \`ifdef SIMULATION ... \`endif
\`include \xA6 Insert another file \xA6 \`include "defs.vh"
\`timescale \xA6 Time unit / precision for # delays in following modules \xA6 \`timescale 1ns / 1ps
\`default_nettype \xA6 Type of implicitly declared nets; "none" makes typos in names an error \xA6 \`default_nettype none
\`resetall \xA6 Reset all directives to their defaults
\`celldefine \`endcelldefine \xA6 Mark modules as library cells
\`line \xA6 Set the reported file and line
\`unconnected_drive \`nounconnected_drive \xA6 Pull unconnected input ports up or down
\`pragma \xA6 Tool-specific pragma
\`begin_keywords \`end_keywords \xA6 Use the keyword set of a given standard version
\`__FILE__ \`__LINE__ \xA6 Current file name / line number
`);
var OPERATORS2 = docTable(`
<= \xA6 Nonblocking assignment: the new value takes effect at the end of the time step, so all flip-flops update together. Use in clocked blocks \xA6 always_ff @(posedge clk) begin a <= b; b <= a; end  // swaps
@ \xA6 Event control: wait for an edge or a change \xA6 @(posedge clk) / @(*)
# \xA6 Delay (#10, in time units of \`timescale) or parameter override (#(.W(8)))
|-> \xA6 SVA overlapping implication: if the antecedent matches, check the consequent starting in the same cycle \xA6 req |-> ack
|=> \xA6 SVA non-overlapping implication: check the consequent starting one cycle later \xA6 req |=> ack
## \xA6 SVA cycle delay: ##1 next cycle, ##[1:3] one to three cycles later \xA6 req ##1 gnt
`);
var lookup3 = (tag, title, e) => e && { title, tag, ...e };
function describeVerilog(text, kind) {
  var _a;
  switch (kind) {
    case "keyword":
      return lookup3("Verilog keyword", text, KEYWORDS4.get(text));
    case "function":
      return lookup3("System task", text, SYSTEM_TASKS.get(text));
    case "directive":
      return (_a = lookup3("Compiler directive", text, DIRECTIVES3.get(text))) != null ? _a : text.startsWith("(*") ? { title: "(* *)", tag: "Attribute", summary: "Tool attribute on the next item, e.g. keep, mark_debug, ram_style or async_reg", syntax: '(* ASYNC_REG = "TRUE" *) logic [1:0] sync;' } : void 0;
    case "operator":
      return lookup3("Verilog operator", text, OPERATORS2.get(/^##/.test(text) ? "##" : text));
    default:
      return void 0;
  }
}

// src/lang/verilog.ts
var KEYWORDS5 = new Set(words(`
  always and assign automatic begin buf bufif0 bufif1 case casex casez cell cmos config deassign default
  defparam design disable edge else end endcase endconfig endfunction endgenerate endmodule endprimitive
  endspecify endtable endtask event for force forever fork function generate genvar highz0 highz1 if ifnone
  incdir include initial inout input instance integer join large liblist library localparam macromodule
  medium module nand negedge nmos nor noshowcancelled not notif0 notif1 or output parameter pmos posedge
  primitive pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent rcmos real realtime reg
  release repeat rnmos rpmos rtran rtranif0 rtranif1 scalared showcancelled signed small specify specparam
  strong0 strong1 supply0 supply1 table task time tran tranif0 tranif1 tri tri0 tri1 triand trior trireg
  unsigned use uwire vectored wait wand weak0 weak1 while wire wor xnor xor

  accept_on alias always_comb always_ff always_latch assert assume before bind bins binsof bit break byte
  chandle checker class clocking const constraint context continue cover covergroup coverpoint cross dist
  do endchecker endclass endclocking endgroup endinterface endpackage endprogram endproperty endsequence
  enum eventually expect export extends extern final first_match foreach forkjoin global iff ignore_bins
  illegal_bins implements implies import inside int interconnect interface intersect join_any join_none
  let local logic longint matches modport nettype new nexttime null package packed priority program
  property protected pure rand randc randcase randsequence ref reject_on restrict return s_always
  s_eventually s_nexttime s_until s_until_with sequence shortint shortreal soft solve static string strong
  struct super sync_accept_on sync_reject_on tagged this throughout timeprecision timeunit type typedef
  union unique unique0 until until_with untyped var virtual void wait_order weak wildcard with within
`));
var DIRECTIVES4 = new Set(words(`
  define undef undefineall ifdef ifndef elsif else endif include timescale default_nettype resetall
  celldefine endcelldefine line unconnected_drive nounconnected_drive pragma begin_keywords end_keywords
  __FILE__ __LINE__
`));
var DECLARES = new Set(words("module macromodule interface package program class primitive checker config"));
var NAMED_BLOCK = /^(?:begin|end\w*|fork|join\w*)$/;
var STMT_START = /^(?:begin|end|else|fork|join\w*|do|forever|initial|final|always\w*|default)$/;
var NUMBER_BASED = /^(?:\d[\d_]*)?'[sS]?[bodhBODH][0-9a-fA-FxXzZ?_]+/;
var NUMBER_FILL = /^'[01xzXZ](?![\w'])/;
var NUMBER4 = /^\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?(?:fs|ps|ns|us|ms|s|step)?(?![\w'])/;
function makeVerilogParser() {
  return {
    startState: () => ({ inBlockComment: false, depth: 0, assigned: false, nameNext: false }),
    copyState: (s) => ({ ...s }),
    token(stream, s) {
      if (s.inBlockComment) {
        if (stream.match(/^.*?\*\//)) s.inBlockComment = false;
        else stream.skipToEnd();
        return "comment";
      }
      if (stream.eatSpace()) return null;
      if (stream.match("//")) {
        stream.skipToEnd();
        return "comment";
      }
      if (stream.match("/*")) {
        if (!stream.match(/^.*?\*\//)) {
          s.inBlockComment = true;
          stream.skipToEnd();
        }
        return "comment";
      }
      if (stream.match(/^\(\*(?!\s*\))/)) {
        if (!stream.match(/^.*?\*\)/)) stream.skipToEnd();
        return "directive";
      }
      if (stream.match(/^"(?:[^"\\]|\\.)*"?/)) return "string";
      if (stream.match(/^`[a-zA-Z_]\w*/)) return DIRECTIVES4.has(stream.current().slice(1)) ? "directive" : "variable";
      if (stream.match(/^\$[a-zA-Z_][\w$]*/)) return "function";
      if (stream.match(NUMBER_BASED) || stream.match(NUMBER_FILL) || stream.match(NUMBER4)) return "number";
      if (stream.match(/^\\\S+/)) return null;
      if (stream.match(/^\.[a-zA-Z_]\w*(?=\s*\()/)) return "property";
      if (stream.match(/^[a-zA-Z_][\w$]*/)) {
        const word = stream.current();
        if (KEYWORDS5.has(word)) {
          if (DECLARES.has(word)) s.nameNext = true;
          else if (NAMED_BLOCK.test(word) && stream.match(/^\s*:\s*[a-zA-Z_]/, false)) s.nameNext = true;
          if (STMT_START.test(word)) s.assigned = false;
          return "keyword";
        }
        if (s.nameNext) {
          s.nameNext = false;
          return "label";
        }
        return null;
      }
      if (stream.match(/^(?:\|->|\|=>|##\d*)/)) return "operator";
      if (stream.match(/^(?:<<<=|>>>=|<<=|>>=|===|!==|==\?|!=\?|==|!=|>=|->|<->|<<<|>>>|<<|>>|&&|\|\||\*\*|::|\+\+|--|[-+*/%&|^]=)/)) {
        if (/=$/.test(stream.current()) && !/^(?:===|!==|==|!=|>=)$/.test(stream.current())) s.assigned = true;
        return null;
      }
      if (stream.match("<=")) {
        if (s.depth > 0 || s.assigned) return null;
        s.assigned = true;
        return "operator";
      }
      if (stream.match(/^[@#]/)) return "operator";
      const ch = stream.next();
      if (ch === "(" || ch === "[" || ch === "{") s.depth++;
      else if (ch === ")" || ch === "]" || ch === "}") s.depth = Math.max(0, s.depth - 1);
      else if (ch === "=" && s.depth === 0) s.assigned = true;
      else if (ch === ";") {
        s.assigned = false;
        s.depth = 0;
        s.nameNext = false;
      }
      return null;
    }
  };
}
var VERILOG = {
  id: "verilog",
  name: "Verilog",
  aliases: ["v", "vh", "sv", "svh", "systemverilog", "system-verilog"],
  makeParser: makeVerilogParser,
  lineComment: "//",
  blockComment: ["/*", "*/"],
  describe: describeVerilog
};

// src/docs/vhdl.ts
var KEYWORDS6 = docTable(`
library \xA6 Make a library visible \xA6 library ieee;
use \xA6 Make declarations from a package visible \xA6 use ieee.numeric_std.all;
entity \xA6 Interface of a design unit: its generics and ports. Also direct instantiation: u1 : entity work.counter \xA6 entity counter is port (clk : in std_logic; q : out unsigned(7 downto 0)); end entity;
architecture \xA6 Implementation of an entity \xA6 architecture rtl of counter is ... begin ... end architecture;
of \xA6 architecture NAME of ENTITY; array ... of TYPE
is \xA6 Starts the body of a declaration
begin \xA6 Starts the statement part of an architecture, process, function or block
end \xA6 Ends a construct, optionally repeating its kind and name \xA6 end process; / end architecture rtl;
port \xA6 Port list of an entity or component \xA6 port (clk : in std_logic; led : out std_logic_vector(3 downto 0));
generic \xA6 Compile-time parameters of an entity \xA6 generic (WIDTH : natural := 8);
map \xA6 port map / generic map: connect an instance \xA6 u1 : entity work.counter generic map (WIDTH => 8) port map (clk => clk, q => q);
in \xA6 Input port; also part of for ... in
out \xA6 Output port. Before VHDL-2008 it cannot be read inside the architecture
inout \xA6 Bidirectional port (tri-state pins)
buffer \xA6 Output port that can also be read inside
component \xA6 Declare another entity's interface so it can be instantiated by name
signal \xA6 Signal: a wire or register. Assigned with <=; the new value is visible after the current delta cycle \xA6 signal cnt : unsigned(7 downto 0) := (others => '0');
variable \xA6 Variable inside a process or subprogram. Assigned with :=; the new value is visible immediately \xA6 variable tmp : integer;
shared \xA6 shared variable: visible to several processes (protected types)
constant \xA6 Constant \xA6 constant DEPTH : natural := 16;
type \xA6 Declare a type: enumeration (FSM states), array, record, range \xA6 type state_t is (IDLE, RUN, DONE);
subtype \xA6 Constrained version of a type \xA6 subtype byte_t is std_logic_vector(7 downto 0);
array \xA6 Array type \xA6 type mem_t is array (0 to 255) of std_logic_vector(7 downto 0);
record \xA6 Record (struct) type
range \xA6 Range constraint, or the 'range attribute \xA6 integer range 0 to 15
to downto \xA6 Ascending / descending range; std_logic_vector(7 downto 0) is the usual bit order
others \xA6 All remaining elements or choices \xA6 (others => '0') / when others =>
process \xA6 Sequential block run when a signal in its sensitivity list changes. process (clk) with rising_edge(clk) describes flip-flops; process (all) describes combinational logic (VHDL-2008) \xA6 process (clk) begin if rising_edge(clk) then q <= d; end if; end process;
all \xA6 process (all): sensitive to every signal read (VHDL-2008); use x.all: everything in a package
if then elsif else \xA6 Conditional. In a combinational process, a signal not assigned in every branch infers a latch \xA6 if rst = '1' then ... elsif rising_edge(clk) then ... end if;
case \xA6 Multi-way branch; choices must cover every value (use when others) \xA6 case state is when IDLE => ...; when others => ...; end case;
when \xA6 Case choice, or conditional assignment: y <= a when sel = '1' else b;
select with \xA6 Selected assignment \xA6 with sel select y <= a when "00", b when others;
for \xA6 Loop, or generate-for. In synthesis a loop unrolls into parallel hardware \xA6 for i in 0 to 7 loop ... end loop;
while loop \xA6 Loop
exit next \xA6 Leave a loop / skip to its next iteration
generate \xA6 for ... generate / if ... generate: replicate or conditionally include hardware \xA6 gen : for i in 0 to N-1 generate ... end generate;
block \xA6 Group concurrent statements
function \xA6 Function: returns a value, no wait statements \xA6 function parity(v : std_logic_vector) return std_logic is ...
procedure \xA6 Procedure: may have out parameters and wait (testbenches)
pure impure \xA6 pure function has no side effects (the default) / impure may read signals or files
return \xA6 Return from a subprogram; in a declaration, the return type
package body \xA6 Shared types, constants and subprograms; package body holds the implementations \xA6 package cpu_pkg is ... end package;
wait \xA6 Suspend a process (testbenches): wait for 10 ns; wait until rising_edge(clk); wait; \xA6 wait until rising_edge(clk);
after \xA6 Delayed signal assignment (simulation only) \xA6 clk <= not clk after 5 ns;
report severity \xA6 Print a message with severity note/warning/error/failure \xA6 report "done" severity note;
assert \xA6 Check a condition; report if false \xA6 assert cnt < 10 report "overflow" severity error;
null \xA6 Do nothing (a case branch with no action)
open \xA6 Leave an output port unconnected in a port map
alias \xA6 Another name for an object or part of it \xA6 alias opcode : std_logic_vector(6 downto 0) is instr(6 downto 0);
attribute \xA6 Declare or set a user attribute (synthesis attributes) \xA6 attribute ASYNC_REG of sync : signal is "TRUE";
configuration \xA6 Pick architectures for entity instances
transport inertial reject \xA6 Delay models for after (simulation)
force release \xA6 VHDL-2008: override a signal (testbenches)
and or nand nor xor xnor not \xA6 Logical operators (bitwise on vectors); and/or have no precedence over each other, so use parentheses
sll srl sla sra rol ror \xA6 Shift and rotate operators (prefer shift_left/shift_right from numeric_std)
mod rem abs \xA6 Modulo / remainder / absolute value
new access file \xA6 Pointers and files (simulation)
std_logic \xA6 IEEE 1164 single bit with 9 values: '0' '1' 'Z' (high-impedance) 'X' (conflict) 'U' (uninitialized) '-' (don't care) 'L' 'H' 'W'
std_ulogic \xA6 Unresolved std_logic: multiple drivers are an error (catches bugs)
std_logic_vector std_ulogic_vector \xA6 Bit vector with no numeric meaning; convert via unsigned/signed for arithmetic \xA6 std_logic_vector(7 downto 0)
unsigned signed \xA6 numeric_std vector types with arithmetic \xA6 unsigned(7 downto 0)
integer \xA6 32-bit (at least) signed integer; constrain its range for synthesis \xA6 integer range 0 to 255
natural positive \xA6 Integer subtypes \u2265 0 / \u2265 1
boolean \xA6 true / false; conditions in if must be boolean, so write if x = '1' then
bit bit_vector \xA6 Two-valued '0'/'1' type
real \xA6 Floating point (simulation, or constants)
time \xA6 Physical type with units fs ps ns us ms sec
string character \xA6 Text
boolean_vector integer_vector real_vector time_vector \xA6 VHDL-2008 arrays of boolean / integer / real / time
severity_level \xA6 Type of note / warning / error / failure
sfixed ufixed float \xA6 VHDL-2008 fixed/floating-point packages
true false \xA6 Boolean values
note warning error failure \xA6 Severity levels; failure usually stops the simulation
`);
var FUNCTIONS5 = docTable(`
rising_edge \xA6 True on a 0\u21921 transition of a signal: the standard flip-flop clock test \xA6 if rising_edge(clk) then
falling_edge \xA6 True on a 1\u21920 transition \xA6 if falling_edge(clk) then
to_unsigned \xA6 numeric_std: integer \u2192 unsigned of a given width \xA6 to_unsigned(5, 8)
to_signed \xA6 numeric_std: integer \u2192 signed of a given width \xA6 to_signed(-1, 16)
to_integer \xA6 numeric_std: unsigned/signed \u2192 integer (e.g. to index an array) \xA6 mem(to_integer(addr))
resize \xA6 numeric_std: change width (zero-extends unsigned, sign-extends signed) \xA6 resize(a, 16)
shift_left shift_right \xA6 numeric_std: shift by n bits (shift_right of signed is arithmetic) \xA6 shift_left(x, 2)
rotate_left rotate_right \xA6 numeric_std: rotate by n bits
std_match \xA6 Compare treating '-' as don't care
to_stdlogicvector to_stdulogicvector to_bitvector to_bit \xA6 std_logic_1164 conversions between bit and std_logic types
to_x01 is_x \xA6 Map to 'X'/'0'/'1' / check for any X-like value
to_string to_hstring to_ostring to_bstring \xA6 VHDL-2008: value \u2192 string (decimal/hex/octal/binary) for report \xA6 report "q = " & to_hstring(q);
minimum maximum \xA6 VHDL-2008: smaller / larger of two values
now \xA6 Current simulation time
readline read writeline write hread hwrite endfile file_open file_close \xA6 textio file and console I/O
conv_integer conv_std_logic_vector conv_unsigned conv_signed \xA6 Synopsys std_logic_arith conversions (non-standard; prefer numeric_std)
uniform \xA6 ieee.math_real: uniform random number in (0, 1)
finish stop \xA6 VHDL-2008 std.env: end / pause the simulation
`);
var ATTRIBUTES = docTable(`
event \xA6 True if the signal changed in this delta cycle. clk'event and clk = '1' is the old form of rising_edge(clk)
range reverse_range \xA6 Index range of an array \xA6 for i in v'range loop
length \xA6 Number of elements
high low left right \xA6 Bounds of an array or type
ascending \xA6 True for a "to" range
image value \xA6 Value \u2192 string / string \u2192 value \xA6 integer'image(n)
pos val succ pred leftof rightof \xA6 Position of an enumeration value and its neighbours
stable quiet delayed transaction \xA6 Implicit signals derived from a signal
active last_event last_active last_value driving driving_value \xA6 Signal history queries (simulation)
element subtype base \xA6 Types of an object or its elements
simple_name path_name instance_name \xA6 Names as strings (debugging)
`);
var OPERATORS3 = docTable(`
<= \xA6 Signal assignment: the new value is scheduled and becomes visible after the current delta cycle, so all flip-flops update together (like Verilog's nonblocking <=) \xA6 q <= d;
:= \xA6 Variable assignment or initial value: takes effect immediately \xA6 v := v + 1;
=> \xA6 Association: port map (formal => actual), aggregate (others => '0') or case choice (when IDLE =>)
`);
var lookup4 = (tag, title, e) => e && { title, tag, ...e };
function describeVhdl(text, kind) {
  const key = text.toLowerCase();
  switch (kind) {
    case "keyword":
      return lookup4("VHDL", text, KEYWORDS6.get(key));
    case "function":
      return lookup4("VHDL function", text, FUNCTIONS5.get(key));
    case "property":
      return lookup4("VHDL attribute", text, ATTRIBUTES.get(key.replace(/^'/, "")));
    case "operator":
      return lookup4("VHDL operator", text, OPERATORS3.get(text));
    default:
      return void 0;
  }
}

// src/lang/vhdl.ts
var KEYWORDS7 = new Set(words(`
  abs access after alias all and architecture array assert assume assume_guarantee attribute begin block
  body buffer bus case component configuration constant context cover default disconnect downto else
  elsif end entity exit fairness file for force function generate generic group guarded if impure in
  inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or
  others out package parameter port postponed procedure process property protected pure range record
  register reject release rem report restrict restrict_guarantee return rol ror select sequence severity
  shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable
  vmode vprop vunit wait when while with xnor xor
`));
var TYPES = new Set(words(`
  bit bit_vector boolean boolean_vector character integer integer_vector natural positive real real_vector
  severity_level string time time_vector std_logic std_logic_vector std_ulogic std_ulogic_vector
  signed unsigned sfixed ufixed float
`));
var FUNCTIONS6 = new Set(words(`
  rising_edge falling_edge to_unsigned to_signed to_integer to_stdlogicvector to_stdulogicvector
  to_bitvector to_bit to_x01 is_x resize shift_left shift_right rotate_left rotate_right std_match
  to_string to_hstring to_ostring to_bstring minimum maximum now endfile readline writeline read write
  hread hwrite file_open file_close conv_integer conv_std_logic_vector conv_unsigned conv_signed
  uniform finish stop
`));
var VALUES = new Set(words("true false note warning error failure"));
var DECLARES2 = new Set(words("entity architecture component package body configuration context procedure function"));
var STMT_START2 = new Set(words("begin then else is loop generate"));
var COND_START = new Set(words("if elsif while until assert when return"));
var COND_END = new Set(words("then loop report generate"));
var LABEL_FOLLOWS = /^\s*:\s*(?:(?:postponed\s+)?(?:process|block|for|if|case|while|loop|assert|entity|component|configuration|with)\b|[a-z]\w*(?:\.\w+)*\s*(?:$|generic\s+map|port\s+map))/i;
var BIT_STRING = /^\d*[us]?[bodx]"[^"]*"?/i;
var NUMBER5 = /^\d[\d_]*(?:#[0-9a-f_]+(?:\.[0-9a-f_]+)?#|(?:\.\d[\d_]*)?)(?:e[+-]?\d+)?(?![\w#])/i;
function makeVhdlParser() {
  return {
    startState: () => ({
      inBlockComment: false,
      depth: 0,
      assigned: false,
      inCond: false,
      stmtStart: true,
      nameNext: false,
      afterName: false,
      archHeader: false
    }),
    copyState: (s) => ({ ...s }),
    token(stream, s) {
      if (s.inBlockComment) {
        if (stream.match(/^.*?\*\//)) s.inBlockComment = false;
        else stream.skipToEnd();
        return "comment";
      }
      if (stream.eatSpace()) return null;
      const afterName = s.afterName;
      s.afterName = false;
      if (stream.match("--")) {
        stream.skipToEnd();
        return "comment";
      }
      if (stream.match("/*")) {
        if (!stream.match(/^.*?\*\//)) {
          s.inBlockComment = true;
          stream.skipToEnd();
        }
        return "comment";
      }
      if (stream.match(BIT_STRING)) return "number";
      if (stream.match(/^"(?:[^"]|"")*"?/)) return "string";
      if (afterName && stream.match(/^'[a-z]\w*/i)) {
        s.afterName = true;
        return "property";
      }
      if (!afterName && stream.match(/^'.'/)) return "string";
      if (stream.match(NUMBER5)) return "number";
      if (stream.match(/^\\[^\\]*\\?/)) {
        s.afterName = true;
        return null;
      }
      if (stream.match(/^[a-z]\w*/i)) {
        const word = stream.current().toLowerCase();
        const stmtStart = s.stmtStart;
        s.stmtStart = false;
        if (KEYWORDS7.has(word)) {
          if (word === "end") s.nameNext = true;
          else if (DECLARES2.has(word)) {
            s.nameNext = true;
            if (word === "architecture") s.archHeader = true;
          } else if (word === "of" && s.archHeader) s.nameNext = true;
          else if (word === "is") s.archHeader = false;
          if (COND_START.has(word)) s.inCond = true;
          if (COND_END.has(word)) s.inCond = false;
          if (STMT_START2.has(word)) {
            s.assigned = false;
            s.stmtStart = true;
          }
          return "keyword";
        }
        s.afterName = true;
        if (s.nameNext) {
          s.nameNext = false;
          stream.match(/^(?:\.\w+)+/);
          return "label";
        }
        if (stmtStart && s.depth === 0 && stream.match(LABEL_FOLLOWS, false)) {
          s.stmtStart = true;
          return "label";
        }
        if (TYPES.has(word) || VALUES.has(word)) return "keyword";
        if (FUNCTIONS6.has(word)) return "function";
        return null;
      }
      if (stream.match(/^(?:<=|:=)/)) {
        if (s.depth > 0 || s.inCond || s.assigned) return null;
        s.assigned = true;
        return "operator";
      }
      if (stream.match("=>")) {
        if (s.depth === 0) {
          s.inCond = false;
          s.assigned = false;
          s.stmtStart = true;
        }
        return "operator";
      }
      if (stream.match(/^(?:\/=|>=|\*\*|\?\?|\?[/<>]?=|\?[<>]|<>)/)) return null;
      const ch = stream.next();
      if (ch === "(") s.depth++;
      else if (ch === ")") {
        s.depth = Math.max(0, s.depth - 1);
        s.afterName = true;
      } else if (ch === "]") s.afterName = true;
      else if (ch === ";") {
        s.depth = 0;
        s.assigned = false;
        s.inCond = false;
        s.stmtStart = true;
        s.nameNext = false;
        s.archHeader = false;
      }
      return null;
    }
  };
}
var VHDL = {
  id: "vhdl",
  name: "VHDL",
  aliases: ["vhd"],
  makeParser: makeVhdlParser,
  lineComment: "--",
  blockComment: ["/*", "*/"],
  describe: describeVhdl
};

// src/languages.ts
var ALL_LANGUAGES = [
  ...ALL_ISAS.map(asmLanguage),
  MAKEFILE,
  LINKER,
  DEVICETREE,
  ...OBJDUMP_LANGUAGES,
  VERILOG,
  VHDL,
  ...CONSTRAINT_LANGUAGES
];
var BY_TAG2 = /* @__PURE__ */ new Map();
for (const lang of ALL_LANGUAGES) for (const tag of [lang.id, ...lang.aliases]) BY_TAG2.set(tag, lang);
function languageForTag(tag) {
  return BY_TAG2.get(tag.trim().toLowerCase());
}
function languageById(id) {
  return ALL_LANGUAGES.find((l) => l.id === id);
}

// src/tokenizer/tokenizeLines.ts
var import_language = require("@codemirror/language");
function tokenizeLines(text, lang) {
  const parser = lang.makeParser();
  const state = parser.startState();
  return text.split("\n").map((line) => {
    var _a, _b;
    const tokens = [];
    const stream = new import_language.StringStream(line, 4, 2);
    while (!stream.eol()) {
      const kind = parser.token(stream, state);
      if (stream.pos === stream.start) {
        throw new Error(`asmlight: tokenizer made no progress at ${JSON.stringify(line.slice(stream.pos))}`);
      }
      tokens.push({ text: stream.current(), kind, lang: (_b = (_a = parser.tokenLang) == null ? void 0 : _a.call(parser, state)) != null ? _b : lang.id });
      stream.start = stream.pos;
    }
    return tokens;
  });
}

// src/adapters/reading.ts
function languageForCodeElement(code) {
  for (const cls of Array.from(code.classList)) {
    if (cls.startsWith("language-")) return languageForTag(cls.slice("language-".length));
  }
  return void 0;
}
function highlightCodeElement(code, lang) {
  var _a;
  const lines = tokenizeLines((_a = code.textContent) != null ? _a : "", lang);
  code.empty();
  lines.forEach((tokens, i) => {
    if (i > 0) code.appendText("\n");
    for (const t of tokens) {
      if (!t.kind) code.appendText(t.text);
      else code.createSpan({ cls: `token ${PRISM_CLASS[t.kind]} asmlight-${t.kind} asmlight-lang-${t.lang}`, text: t.text });
    }
  });
}

// src/hover/number.ts
var ZERO = BigInt(0);
var ONE = BigInt(1);
var WIDTHS = [8, 16, 32, 64];
var LINKER_SCALE = { k: 10, m: 20, g: 30 };
var BASES = { b: 2, o: 8, x: 16, h: 16 };
function parseHdl(s, lang) {
  var _a;
  s = s.replace(/_/g, "");
  const m = lang === "verilog" ? /^(\d*)'s?([boh])([0-9a-f]+)$/i.exec(s) : (_a = /^(\d*)[us]?([box])"([0-9a-f]+)"$/i.exec(s)) != null ? _a : /^()(2|8|16)#([0-9a-f]+)#$/i.exec(s);
  if (!m) return void 0;
  const base = /^\d+$/.test(m[2]) ? Number(m[2]) : BASES[m[2].toLowerCase()];
  const valid = base === 16 ? /^[0-9a-f]+$/i : base === 8 ? /^[0-7]+$/ : /^[01]+$/;
  if (!valid.test(m[3])) return void 0;
  const size = m[1] ? Number(m[1]) : void 0;
  const prefix = base === 16 ? "0x" : base === 8 ? "0o" : "0b";
  return {
    value: BigInt(prefix + m[3]),
    negative: false,
    base,
    digits: m[3].length,
    shift: 0,
    bits: size && size <= 64 ? size : void 0
  };
}
function parseLiteral(text, lang = "") {
  var _a;
  if (lang === "verilog" || lang === "vhdl") return parseHdl(text.trim(), lang);
  let s = text.trim().replace(/^#/, "");
  let bareHex = lang.startsWith("objdump");
  if (lang === "devicetree" && s.startsWith("@")) {
    s = s.slice(1);
    bareHex = true;
  }
  const negative = s.startsWith("-");
  if (negative) s = s.slice(1);
  s = s.replace(/_/g, "");
  let shift = 0;
  const m = /^0([xbo])([0-9a-f]+?)([ul]{1,3}|[kmg])?$/i.exec(s);
  let base;
  let digits;
  if (m) {
    base = { x: 16, b: 2, o: 8 }[m[1].toLowerCase()];
    digits = m[2];
    const suffix = (_a = m[3]) == null ? void 0 : _a.toLowerCase();
    if (suffix && suffix in LINKER_SCALE) {
      if (lang !== "linker") return void 0;
      shift = LINKER_SCALE[suffix];
    }
  } else if (bareHex && /^[0-9a-f]+$/i.test(s)) {
    base = 16;
    digits = s;
  } else if (/^0[0-7]+(?:[ul]{1,3})?$/i.test(s)) {
    base = 8;
    digits = s.slice(1).replace(/[ul]+$/i, "");
  } else {
    return void 0;
  }
  const valid = base === 16 ? /^[0-9a-f]+$/i : base === 8 ? /^[0-7]+$/ : /^[01]+$/;
  if (!valid.test(digits)) return void 0;
  const prefix = base === 16 ? "0x" : base === 8 ? "0o" : "0b";
  return { value: BigInt(prefix + digits), negative, base, digits: digits.length, shift };
}
function group(s, size, sep) {
  const out = [];
  for (let i = s.length; i > 0; i -= size) out.unshift(s.slice(Math.max(0, i - size), i));
  return out.join(sep);
}
function ascii(bits, width) {
  let s = "";
  for (let i = width - 8; i >= 0; i -= 8) {
    const c = Number(bits >> BigInt(i) & BigInt(255));
    if (c === 0 && !s) continue;
    if (c < 32 || c > 126) return void 0;
    s += String.fromCharCode(c);
  }
  return s ? `"${s}"` : void 0;
}
function describeNumber(text, lang = "") {
  var _a;
  const lit = parseLiteral(text, lang);
  if (!lit) return void 0;
  const magnitude = lit.value << BigInt(lit.shift);
  const value = lit.negative ? -magnitude : magnitude;
  const writtenBits = lit.shift ? 0 : lit.digits * (lit.base === 16 ? 4 : lit.base === 8 ? 3 : 1);
  const needed = lit.negative ? (magnitude - ONE).toString(2).length + 1 : magnitude.toString(2).length;
  const width = (_a = lit.bits) != null ? _a : WIDTHS.find((w) => w >= Math.max(writtenBits, needed));
  const rows = [];
  if (width === void 0) {
    rows.push(["Decimal", value.toString()]);
    rows.push(["Hex", (lit.negative ? "-0x" : "0x") + group(magnitude.toString(16), 4, "_")]);
    return { title: text.trim(), tag: "Number", summary: "", rows };
  }
  const mask = (ONE << BigInt(width)) - ONE;
  const bits = value & mask;
  const signBit = ONE << BigInt(width - 1);
  const signed = bits & signBit ? bits - (ONE << BigInt(width)) : bits;
  const pad = (s, n) => s.padStart(n, "0");
  rows.push(["Unsigned", group(bits.toString(10), 3, ",")]);
  rows.push([`Signed (i${width})`, (signed < ZERO ? "-" : "") + group((signed < ZERO ? -signed : signed).toString(10), 3, ",")]);
  rows.push(["Hex", "0x" + group(pad(bits.toString(16), Math.ceil(width / 4)), 4, "_")]);
  rows.push(["Binary", group(pad(bits.toString(2), width), 4, " ")]);
  rows.push(["Octal", "0o" + bits.toString(8)]);
  const chars = ascii(bits, width);
  if (chars) rows.push(["ASCII", chars]);
  return { title: text.trim(), tag: `Number \xB7 ${width}-bit`, summary: "", rows };
}

// src/hover/hover.ts
var KINDS = /* @__PURE__ */ new Set([
  "comment",
  "label",
  "mnemonic",
  "directive",
  "register",
  "number",
  "string",
  "reloc",
  "keyword",
  "function",
  "variable",
  "operator",
  "property"
]);
var ASMLIGHT_SELECTOR = '[class*="asmlight-lang-"]';
var NUMBER_SELECTOR = "pre .token.number, .HyperMD-codeblock .cm-number";
var TOKEN_SELECTOR = `${ASMLIGHT_SELECTOR}, ${NUMBER_SELECTOR}`;
function parseTokenClasses(classes) {
  let kind;
  let lang;
  for (const raw of classes) {
    const cls = raw.replace(/^cm-/, "");
    if (cls.startsWith("asmlight-lang-")) lang = cls.slice("asmlight-lang-".length);
    else if (cls.startsWith("asmlight-") && KINDS.has(cls.slice("asmlight-".length))) kind = cls.slice("asmlight-".length);
  }
  return kind && lang ? { kind, lang } : void 0;
}
function docForElement(el3) {
  var _a, _b, _c;
  const info = parseTokenClasses(Array.from(el3.classList));
  const text = (_a = el3.textContent) == null ? void 0 : _a.trim();
  if (!text) return void 0;
  if (!info) return el3.matches(NUMBER_SELECTOR) ? describeNumber(text, "c") : void 0;
  if (info.kind === "number") return describeNumber(text, info.lang);
  return (_c = (_b = languageById(info.lang)) == null ? void 0 : _b.describe) == null ? void 0 : _c.call(_b, text, info.kind);
}
function renderCard(doc, parent) {
  var _a, _b;
  const el3 = (into, tag, cls, text) => into.createEl(tag, { cls: cls || void 0, text });
  const card = el3(parent, "div", "asmlight-hover");
  card.setAttribute("role", "tooltip");
  const head = el3(card, "div", "asmlight-hover-head");
  el3(head, "code", "asmlight-hover-title", doc.title);
  el3(head, "span", "asmlight-hover-tag", doc.tag);
  if (doc.summary) el3(card, "div", "asmlight-hover-summary", doc.summary);
  if ((_a = doc.rows) == null ? void 0 : _a.length) {
    const table = el3(card, "table", "asmlight-hover-rows");
    for (const [label, value] of doc.rows) {
      const tr = el3(table, "tr", "");
      el3(tr, "th", "asmlight-hover-label", label);
      el3(tr, "td", "asmlight-hover-value", value);
    }
  }
  for (const [label, body] of [["Syntax", doc.syntax], ["Operation", doc.operation]]) {
    if (!body) continue;
    const block = el3(card, "div", "asmlight-hover-block");
    el3(block, "div", "asmlight-hover-label", label);
    el3(block, "code", "asmlight-hover-code", body);
  }
  if ((_b = doc.notes) == null ? void 0 : _b.length) {
    const ul = el3(card, "ul", "asmlight-hover-notes");
    for (const n of doc.notes) el3(ul, "li", "", n);
  }
  return card;
}
function placeCard(anchor, card, viewport, gap2 = 6, margin = 8) {
  const left = Math.max(margin, Math.min(anchor.left, viewport.width - card.width - margin));
  const below = anchor.bottom + gap2;
  const above = anchor.top - gap2 - card.height;
  const top = below + card.height <= viewport.height - margin || above < margin ? below : above;
  return { left, top: Math.max(margin, top) };
}
var HoverController = class {
  constructor(doc, opts) {
    this.doc = doc;
    this.opts = opts;
    this.card = null;
    this.current = null;
    this.cleanups = [];
    const win = doc.defaultView;
    this.listen(doc, "mouseover", (e) => this.onOver(e));
    this.listen(doc, "mousedown", (e) => {
      var _a, _b;
      const token = (_b = (_a = e.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, TOKEN_SELECTOR);
      if (token !== this.current) this.hide();
    });
    this.listen(doc, "keydown", (e) => {
      const k = e;
      if ((k.key === "Control" || k.key === "Meta") && this.current && !this.card) this.show(this.current, 0);
      else if (k.key !== "Control" && k.key !== "Meta") this.hide();
    });
    this.listen(doc, "scroll", () => this.hide(), true);
    this.listen(win, "blur", () => this.hide());
    this.listen(doc.documentElement, "mouseleave", () => this.hide());
  }
  listen(target, type, fn, capture = false) {
    target.addEventListener(type, fn, capture);
    this.cleanups.push(() => target.removeEventListener(type, fn, capture));
  }
  onOver(e) {
    var _a, _b, _c;
    const token = (_c = (_b = (_a = e.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, TOKEN_SELECTOR)) != null ? _c : null;
    if (token === this.current) return;
    this.hide();
    this.current = token;
    if (!token || !this.opts.enabled()) return;
    if (this.opts.requireModifier() && !(e.ctrlKey || e.metaKey)) return;
    this.show(token, this.opts.delay());
  }
  show(token, delay) {
    const win = this.doc.defaultView;
    win.clearTimeout(this.timer);
    this.timer = win.setTimeout(() => {
      if (this.current !== token || !token.isConnected) return;
      const doc = docForElement(token);
      if (!doc) return;
      this.removeCard();
      const card = renderCard(doc, this.doc.body);
      card.classList.add("is-measuring");
      const r = token.getBoundingClientRect();
      const pos = placeCard(r, { width: card.offsetWidth, height: card.offsetHeight }, { width: win.innerWidth, height: win.innerHeight });
      card.setCssProps({ "--asmlight-hover-left": `${pos.left}px`, "--asmlight-hover-top": `${pos.top}px` });
      card.classList.remove("is-measuring");
      this.card = card;
    }, delay);
  }
  removeCard() {
    var _a;
    (_a = this.card) == null ? void 0 : _a.remove();
    this.card = null;
  }
  hide() {
    var _a;
    (_a = this.doc.defaultView) == null ? void 0 : _a.clearTimeout(this.timer);
    this.current = null;
    this.removeCard();
  }
  destroy() {
    this.hide();
    for (const c of this.cleanups.splice(0)) c();
  }
};

// src/regmap/parse.ts
var RESERVED = /* @__PURE__ */ new Set(["-", "0", "1", "res0", "res1", "reserved", "rsvd", "wpri", "raz", "rao"]);
var HEADER = /^(?:"([^"]+)"|([^\s:"]+)):\s*(\d+)(?:\s*\/\s*(\d+))?(?:\s*=\s*(\S+))?(?:\s+(.*))?$/;
var FIELD = /^(\S+)\s+\[?(\d+)(?:\s*[:-]\s*(\d+))?\]?(?:\s+(.*))?$/;
var VALUE = /^=\s*(\S+)\s*$/;
function parseNumber(text) {
  const t = text.replace(/_/g, "").toLowerCase();
  if (!/^(?:0x[0-9a-f]+|0b[01]+|0o[0-7]+|\d+)$/.test(t)) return void 0;
  return BigInt(t);
}
function parseEnums(desc) {
  const m = /\{([^{}]*)\}\s*$/.exec(desc);
  if (!m) return { desc, enums: [] };
  const enums = [];
  for (const part of m[1].split(",")) {
    const kv = /^\s*(\S+?)\s*[:=]\s*(.+?)\s*$/.exec(part);
    const key = kv ? parseNumber(kv[1]) : void 0;
    if (kv && key !== void 0) enums.push([key, kv[2]]);
  }
  return enums.length ? { desc: desc.slice(0, m.index).trim(), enums } : { desc, enums: [] };
}
function newRegister(name = "", width = 0, perRow = 0, caption = "") {
  return { name, caption, width, perRow, fields: [], errors: [] };
}
function finish(reg) {
  var _a;
  const maxBit = reg.fields.reduce((m, f) => Math.max(m, f.hi), -1);
  if (!reg.width) reg.width = (_a = [8, 16, 32, 64, 128].find((w) => w > maxBit)) != null ? _a : maxBit + 1;
  if (!reg.perRow) reg.perRow = Math.min(reg.width, 32);
  for (const f of reg.fields) {
    if (f.hi >= reg.width) reg.errors.push(`${f.name}: bit ${f.hi} is outside a ${reg.width}-bit register`);
  }
  const sorted = [...reg.fields].sort((a, b) => b.hi - a.hi);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].hi >= sorted[i - 1].lo) reg.errors.push(`${sorted[i].name} overlaps ${sorted[i - 1].name}`);
  }
  reg.fields = sorted;
  if (reg.value !== void 0 && reg.value >> BigInt(reg.width) !== BigInt(0)) {
    reg.errors.push(`value does not fit in ${reg.width} bits`);
  }
  return reg;
}
function parseRegmap(src) {
  const regs = [];
  let cur;
  src.split("\n").forEach((raw, i) => {
    var _a, _b, _c;
    const line = raw.trim();
    if (!line || line.startsWith("#") || line.startsWith("//")) return;
    const lineNo = i + 1;
    const h = HEADER.exec(line);
    if (h) {
      if (cur) regs.push(finish(cur));
      cur = newRegister((_a = h[1]) != null ? _a : h[2], Number(h[3]), h[4] ? Number(h[4]) : 0, (_b = h[6]) != null ? _b : "");
      if (cur.width < 1 || cur.width > 128) {
        cur.errors.push(`line ${lineNo}: width must be 1\u2013128`);
        cur.width = 32;
      }
      if (cur.perRow < 0 || cur.perRow > cur.width) cur.perRow = 0;
      if (h[5]) {
        const v2 = parseNumber(h[5]);
        if (v2 === void 0) cur.errors.push(`line ${lineNo}: "${h[5]}" is not a number`);
        else cur.value = v2;
      }
      return;
    }
    cur != null ? cur : cur = newRegister();
    const v = VALUE.exec(line);
    if (v) {
      const n = parseNumber(v[1]);
      if (n === void 0) cur.errors.push(`line ${lineNo}: "${v[1]}" is not a number`);
      else cur.value = n;
      return;
    }
    const f = FIELD.exec(line);
    if (!f) {
      cur.errors.push(`line ${lineNo}: expected "NAME hi:lo description", got "${line}"`);
      return;
    }
    let hi = Number(f[2]);
    let lo = f[3] === void 0 ? hi : Number(f[3]);
    if (lo > hi) [hi, lo] = [lo, hi];
    const { desc, enums } = parseEnums((_c = f[4]) != null ? _c : "");
    cur.fields.push({ name: f[1], hi, lo, desc, enums, reserved: RESERVED.has(f[1].toLowerCase()) });
  });
  if (cur) regs.push(finish(cur));
  return regs;
}
function layoutRows(reg) {
  const rows = [];
  for (let top = reg.width - 1; top >= 0; top -= reg.perRow) {
    const bottom = Math.max(0, top - reg.perRow + 1);
    const row = [];
    let next = top;
    for (const field of reg.fields) {
      const hi = Math.min(field.hi, top);
      const lo = Math.max(field.lo, bottom);
      if (hi < lo || hi > next) continue;
      if (hi < next) row.push({ hi: next, lo: hi + 1 });
      row.push({ hi, lo, field });
      next = lo - 1;
    }
    if (next >= bottom) row.push({ hi: next, lo: bottom });
    rows.push(row);
  }
  return rows;
}
function fieldValue(value, hi, lo) {
  return value >> BigInt(lo) & (BigInt(1) << BigInt(hi - lo + 1)) - BigInt(1);
}
function formatValue(v, bits) {
  if (bits === 1) return v.toString();
  if (bits <= 4) return `0b${v.toString(2).padStart(bits, "0")} (${v})`;
  return `0x${v.toString(16).toUpperCase()} (${v})`;
}
function bitRange(hi, lo) {
  return hi === lo ? `${hi}` : `${hi}:${lo}`;
}

// src/memmap/parse.ts
var SETTING = /^(title|order|scale|base|stride)\s*:\s*(.*)$/i;
var ENTRY = /^\[(\d+)\]\s+(\S+)(?:\s+(.*))?$/;
var RANGE = /^(\S+?)\s*\.\.\s*(\S+)\s+(\S+)(?:\s+(.*))?$/;
var UNITS = { k: 10, m: 20, g: 30 };
function parseSize(text) {
  const m = /^(.+?)([kmg])(?:i?b)?$/i.exec(text);
  if (m && !/^0x/i.test(text)) {
    const n = parseNumber(m[1]);
    return n === void 0 ? void 0 : n << BigInt(UNITS[m[2].toLowerCase()]);
  }
  return parseNumber(text);
}
function splitAttrs(rest) {
  const m = /\{([^{}]*)\}\s*$/.exec(rest);
  return m ? { desc: rest.slice(0, m.index).trim(), attrs: m[1].trim() } : { desc: rest.trim(), attrs: "" };
}
function stripComment(line) {
  const t = line.trim();
  if (t.startsWith("#") || t.startsWith("//")) return "";
  return t.replace(/\s+(?:#|\/\/)\s.*$/, "").trim();
}
var contains = (outer, inner) => outer.start <= inner.start && inner.end <= outer.end;
var overlaps = (a, b) => a.start < b.end && b.start < a.end;
function insert(list, r, errors) {
  for (const node of list) {
    if (contains(node, r)) {
      insert(node.children, r, errors);
      return;
    }
    if (overlaps(node, r)) errors.push(`${r.name} overlaps ${node.name}`);
  }
  list.push(r);
}
function placeMarker(list, m) {
  for (const node of list) {
    if (node.start <= m.addr && m.addr < node.end) {
      if (!placeMarker(node.children, m)) node.markers.push(m);
      return true;
    }
  }
  return false;
}
function parseMemmap(src) {
  const map = { title: "", order: "up", scale: "even", stride: BigInt(4), regions: [], markers: [], digits: 8, errors: [] };
  const flat = [];
  const markers = [];
  const err = (lineNo, msg) => map.errors.push(`line ${lineNo}: ${msg}`);
  const region = (start, end, name, rest, index) => ({ start, end, name, ...splitAttrs(rest), ...index !== void 0 ? { index } : {}, children: [], markers: [] });
  src.split("\n").forEach((raw, i) => {
    var _a, _b;
    const line = stripComment(raw);
    const lineNo = i + 1;
    if (!line) return;
    const set = SETTING.exec(line);
    if (set) {
      const key = set[1].toLowerCase();
      const value = set[2].trim();
      if (key === "title") map.title = value;
      else if (key === "order") {
        if (value === "up" || value === "down") map.order = value;
        else err(lineNo, `order must be "up" or "down"`);
      } else if (key === "scale") {
        if (value === "even" || value === "log") map.scale = value;
        else err(lineNo, `scale must be "even" or "log"`);
      } else {
        const n = key === "stride" ? parseSize(value) : parseNumber(value);
        if (n === void 0 || key === "stride" && n <= BigInt(0)) err(lineNo, `"${value}" is not a valid ${key}`);
        else if (key === "base") map.base = n;
        else map.stride = n;
      }
      return;
    }
    const entry = ENTRY.exec(line);
    if (entry) {
      if (map.base === void 0) {
        err(lineNo, `[${entry[1]}] needs a "base:" line before it`);
        return;
      }
      const start2 = map.base + BigInt(entry[1]) * map.stride;
      flat.push(region(start2, start2 + map.stride, entry[2], (_a = entry[3]) != null ? _a : "", Number(entry[1])));
      return;
    }
    const range2 = RANGE.exec(line);
    if (range2) {
      const start2 = parseNumber(range2[1]);
      const last = parseNumber(range2[2]);
      if (start2 === void 0 || last === void 0) {
        err(lineNo, `"${range2[1]}..${range2[2]}" is not an address range`);
        return;
      }
      if (last < start2) {
        err(lineNo, `${range2[3]}: end is below start`);
        return;
      }
      flat.push(region(start2, last + BigInt(1), range2[3], (_b = range2[4]) != null ? _b : ""));
      return;
    }
    const [first, second, ...rest] = line.split(/\s+/);
    const start = parseNumber(first);
    if (start === void 0) {
      err(lineNo, `expected "ADDRESS SIZE NAME", got "${line}"`);
      return;
    }
    if (second === void 0) {
      err(lineNo, `${first} needs a name`);
      return;
    }
    const size = parseSize(second);
    if (size === void 0) {
      markers.push({ addr: start, name: second, desc: rest.join(" ") });
    } else if (rest.length === 0) {
      err(lineNo, `${first} ${second} needs a name`);
    } else if (size <= BigInt(0)) {
      err(lineNo, `${rest[0]}: size must be positive`);
    } else {
      flat.push(region(start, start + size, rest[0], rest.slice(1).join(" ")));
    }
  });
  flat.sort((a, b) => a.start !== b.start ? a.start < b.start ? -1 : 1 : a.end > b.end ? -1 : a.end < b.end ? 1 : 0);
  for (const r of flat) insert(map.regions, r, map.errors);
  for (const m of [...markers].sort((a, b) => a.addr < b.addr ? -1 : a.addr > b.addr ? 1 : 0)) {
    if (!placeMarker(map.regions, m)) map.markers.push(m);
  }
  const top = [...flat.map((r) => r.end - BigInt(1)), ...markers.map((m) => m.addr)].reduce((a, b) => b > a ? b : a, BigInt(0));
  map.digits = top > BigInt("0xFFFFFFFF") ? 16 : 8;
  return map;
}
function layout(regions, markers, parent) {
  const items = [];
  const edges = parent !== void 0 && regions.length > 0;
  let cursor = edges ? parent.start : void 0;
  let prev;
  for (const r of regions) {
    if (cursor !== void 0 && r.start > cursor) items.push(gap(cursor, r.start, prev, r));
    items.push({ kind: "region", region: r });
    cursor = cursor === void 0 || r.end > cursor ? r.end : cursor;
    prev = r;
  }
  if (edges && cursor !== void 0 && cursor < parent.end) items.push(gap(cursor, parent.end, prev, void 0));
  for (const m of markers) {
    let at = items.length;
    for (let i = 0; i < items.length; i++) {
      const s = itemStart(items[i]);
      if (s > m.addr) {
        at = i;
        break;
      }
    }
    items.splice(at, 0, { kind: "marker", marker: m });
  }
  return items;
}
function itemStart(it) {
  return it.kind === "region" ? it.region.start : it.kind === "gap" ? it.start : it.marker.addr;
}
function gap(start, end, before, after) {
  if ((before == null ? void 0 : before.index) !== void 0 && (after == null ? void 0 : after.index) !== void 0 && after.index - before.index > 1) {
    return { kind: "gap", start, end, entries: [before.index + 1, after.index - 1] };
  }
  return { kind: "gap", start, end };
}
function formatAddr(v, digits) {
  const hex = v.toString(16).toUpperCase().padStart(digits, "0");
  return "0x" + hex.replace(/\B(?=(?:[0-9A-F]{4})+$)/g, "_");
}
function formatSize(n) {
  for (const [unit, shift] of [["GiB", 30], ["MiB", 20], ["KiB", 10]]) {
    const u = BigInt(1) << BigInt(shift);
    if (n >= u) {
      const whole = n / u;
      const frac = Number(n % u * BigInt(100) / u) / 100;
      return `${(Number(whole) + frac).toString()} ${unit}`;
    }
  }
  return `${n} B`;
}

// src/memmap/render.ts
function el(parent, tag, cls, text) {
  return parent.createEl(tag, { cls: cls || void 0, text });
}
function logHeight(size) {
  const bits = size.toString(2).length - 1;
  return `${Math.min(10, 2.2 + Math.max(0, bits - 10) * 0.35).toFixed(2)}em`;
}
function renderList(into, items, map, parent) {
  const list = el(into, "div", "asmlight-memmap-list");
  const ordered = map.order === "up" ? [...items].reverse() : items;
  for (const it of ordered) {
    if (it.kind === "region") renderRegion(list, it.region, map, parent);
    else if (it.kind === "gap") renderGap(list, it, map);
    else renderMarker(list, it.marker, map);
  }
}
function renderRegion(into, r, map, parent) {
  const row = el(into, "div", `asmlight-memmap-row${r.index !== void 0 ? " is-entry" : ""}`);
  const last = r.end - BigInt(1);
  const addrs = el(row, "div", "asmlight-memmap-addrs");
  if (r.index !== void 0 || r.end - r.start <= BigInt(1)) {
    el(addrs, "code", "", formatAddr(r.start, map.digits));
  } else {
    const [top, bottom] = map.order === "up" ? [last, r.start] : [r.start, last];
    el(addrs, "code", "", formatAddr(top, map.digits));
    el(addrs, "code", "", formatAddr(bottom, map.digits));
  }
  const box = el(row, "div", "asmlight-memmap-box");
  box.title = `${r.name}: ${formatAddr(r.start, map.digits)} \u2013 ${formatAddr(last, map.digits)} (${formatSize(r.end - r.start)})`;
  if (map.scale === "log" && !r.children.length) box.setCssProps({ "--asmlight-log-height": logHeight(r.end - r.start) });
  const head = el(box, "div", "asmlight-memmap-head");
  if (r.index !== void 0) el(head, "span", "asmlight-memmap-index", `[${r.index}]`);
  el(head, "span", "asmlight-memmap-name", r.name);
  if (parent) el(head, "span", "asmlight-memmap-offset", `+0x${(r.start - parent.start).toString(16).toUpperCase()}`);
  if (r.index === void 0) el(head, "span", "asmlight-memmap-size", formatSize(r.end - r.start));
  if (r.attrs) el(head, "span", "asmlight-memmap-attrs", r.attrs);
  if (r.desc) el(box, "div", "asmlight-memmap-desc", r.desc);
  if (r.children.length || r.markers.length) renderList(box, layout(r.children, r.markers, r), map, r);
}
function renderGap(into, g, map) {
  const row = el(into, "div", "asmlight-memmap-row is-gap");
  el(row, "div", "asmlight-memmap-addrs");
  const text = g.entries ? `\u22EE ${g.entries[1] - g.entries[0] + 1} entries (${g.entries[0]}\u2013${g.entries[1]})` : `\u22EE ${formatSize(g.end - g.start)} unused`;
  const strip = el(row, "div", "asmlight-memmap-gap", text);
  strip.title = `${formatAddr(g.start, map.digits)} \u2013 ${formatAddr(g.end - BigInt(1), map.digits)}`;
}
function renderMarker(into, m, map) {
  const row = el(into, "div", "asmlight-memmap-row is-marker");
  const addrs = el(row, "div", "asmlight-memmap-addrs");
  el(addrs, "code", "", formatAddr(m.addr, map.digits));
  const tag = el(row, "div", "asmlight-memmap-marker");
  el(tag, "span", "asmlight-memmap-arrow", "\u25C0");
  el(tag, "span", "asmlight-memmap-name", m.name);
  if (m.desc) el(tag, "span", "asmlight-memmap-desc", m.desc);
}
function renderMemmap(source, container) {
  const map = parseMemmap(source);
  container.empty();
  const root = el(container, "div", `asmlight-memmap${map.digits > 8 ? " is-64bit" : ""}`);
  if (map.title) el(root, "div", "asmlight-memmap-title", map.title);
  if (map.errors.length) {
    const ul = el(root, "ul", "asmlight-memmap-errors");
    for (const e of map.errors) el(ul, "li", "", e);
  }
  if (!map.regions.length && !map.markers.length) {
    el(root, "div", "asmlight-memmap-empty", 'memmap: describe regions, e.g. "0x2000_0000 128K SRAM"');
  } else {
    renderList(root, layout(map.regions, map.markers), map);
  }
}

// src/regmap/render.ts
function el2(parent, tag, cls, text) {
  return parent.createEl(tag, { cls: cls || void 0, text });
}
function enumLabel(f, v) {
  var _a;
  return (_a = f.enums.find(([k]) => k === v)) == null ? void 0 : _a[1];
}
function renderRegister(into, reg) {
  const fig = el2(into, "figure", "asmlight-regmap-reg");
  const cap = el2(fig, "figcaption", "asmlight-regmap-title");
  if (reg.name) el2(cap, "code", "asmlight-regmap-name", reg.name);
  el2(cap, "span", "asmlight-regmap-width", `${reg.width}-bit`);
  if (reg.value !== void 0) {
    el2(cap, "code", "asmlight-regmap-value", `= 0x${reg.value.toString(16).toUpperCase().padStart(Math.ceil(reg.width / 4), "0")}`);
  }
  if (reg.caption) el2(cap, "span", "asmlight-regmap-caption", reg.caption);
  if (reg.errors.length) {
    const ul = el2(fig, "ul", "asmlight-regmap-errors");
    for (const e of reg.errors) el2(ul, "li", "", e);
  }
  const scroll = el2(fig, "div", "asmlight-regmap-scroll");
  for (const row of layoutRows(reg)) {
    const top = row[0].hi;
    const bits = top - row[row.length - 1].lo + 1;
    const grid = el2(scroll, "div", "asmlight-regmap-grid");
    grid.setCssProps({ "--asmlight-bits": String(bits) });
    for (let b = top; b > top - bits; b--) el2(grid, "div", "asmlight-regmap-bitno", String(b));
    for (const seg of row) {
      const span = seg.hi - seg.lo + 1;
      const f = seg.field;
      const cell = el2(grid, "div", `asmlight-regmap-field${!f ? " is-gap" : f.reserved ? " is-reserved" : ""}`);
      cell.setCssProps({ "--asmlight-span": String(span) });
      if (f) {
        if (f.name !== "-") {
          const label = el2(cell, "span", "asmlight-regmap-label", f.name);
          if (f.name.length > span * 2.5) label.classList.add("is-vertical");
        }
        cell.title = `${f.name} [${bitRange(f.hi, f.lo)}]${f.desc ? ` ${f.desc}` : ""}`;
      } else {
        cell.title = `[${bitRange(seg.hi, seg.lo)}] not described`;
      }
    }
    if (reg.value !== void 0) {
      for (let b = top; b > top - bits; b--) {
        const bit = fieldValue(reg.value, b, b);
        el2(grid, "div", `asmlight-regmap-bit${bit ? " is-set" : ""}`, bit.toString());
      }
    }
  }
  const named = reg.fields.filter((f) => f.name !== "-");
  if (named.length) {
    const table = el2(fig, "table", "asmlight-regmap-legend");
    const head = el2(el2(table, "thead"), "tr");
    for (const h of ["Bits", "Field", ...reg.value !== void 0 ? ["Value"] : [], "Description"]) el2(head, "th", "", h);
    const body = el2(table, "tbody");
    for (const f of named) {
      const tr = el2(body, "tr", f.reserved ? "is-reserved" : "");
      el2(tr, "td", "asmlight-regmap-bits", bitRange(f.hi, f.lo));
      el2(el2(tr, "td"), "code", "", f.name);
      if (reg.value !== void 0) {
        const v = fieldValue(reg.value, f.hi, f.lo);
        const name = enumLabel(f, v);
        el2(tr, "td", "asmlight-regmap-fieldvalue", `${formatValue(v, f.hi - f.lo + 1)}${name ? ` \u2192 ${name}` : ""}`);
      }
      const desc = el2(tr, "td", "", f.desc);
      if (f.enums.length) el2(desc, "div", "asmlight-regmap-enums", f.enums.map(([k, n]) => `${k} = ${n}`).join(", "));
    }
  }
}
function renderRegmap(source, container) {
  container.empty();
  const root = el2(container, "div", "asmlight-regmap");
  const regs = parseRegmap(source);
  if (!regs.length) el2(root, "div", "asmlight-regmap-empty", 'regmap: describe a register, e.g. "mstatus: 32" followed by "MIE 3 Machine interrupt enable"');
  for (const reg of regs) renderRegister(root, reg);
}

// src/settings.ts
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  hoverCards: true,
  hoverRequiresModifier: false,
  hoverDelay: 300
};
var TEXT = {
  hoverCards: ["Hover cards", "Show what an instruction, register, CSR or keyword does when you hover it in a highlighted code block."],
  hoverRequiresModifier: ["Require Ctrl/Cmd", "Only show hover cards while Ctrl (Cmd on macOS) is held, like Obsidian's page preview."],
  hoverDelay: ["Hover delay", "Milliseconds to wait before showing a card."]
};
var DELAY = { min: 0, max: 1e3, step: 50 };
var AsmlightSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  /** Obsidian 1.13+ renders the tab from these (and indexes them for settings search); display() is not called. */
  getSettingDefinitions() {
    const [cards, mod, delay] = [TEXT.hoverCards, TEXT.hoverRequiresModifier, TEXT.hoverDelay];
    return [
      { name: cards[0], desc: cards[1], control: { type: "toggle", key: "hoverCards", defaultValue: DEFAULT_SETTINGS.hoverCards } },
      { name: mod[0], desc: mod[1], control: { type: "toggle", key: "hoverRequiresModifier", defaultValue: DEFAULT_SETTINGS.hoverRequiresModifier } },
      {
        name: delay[0],
        desc: delay[1],
        control: { type: "slider", key: "hoverDelay", defaultValue: DEFAULT_SETTINGS.hoverDelay, ...DELAY, displayFormat: (v) => `${v} ms` }
      }
    ];
  }
  /** Fallback for Obsidian older than 1.13, which doesn't know getSettingDefinitions(). */
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const s = this.plugin.settings;
    new import_obsidian.Setting(containerEl).setName(TEXT.hoverCards[0]).setDesc(TEXT.hoverCards[1]).addToggle((t) => t.setValue(s.hoverCards).onChange(async (v) => {
      s.hoverCards = v;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName(TEXT.hoverRequiresModifier[0]).setDesc(TEXT.hoverRequiresModifier[1]).addToggle((t) => t.setValue(s.hoverRequiresModifier).onChange(async (v) => {
      s.hoverRequiresModifier = v;
      await this.plugin.saveSettings();
    }));
    const delayDesc = (v) => `${TEXT.hoverDelay[1]} Now ${v} ms.`;
    const delay = new import_obsidian.Setting(containerEl).setName(TEXT.hoverDelay[0]).setDesc(delayDesc(s.hoverDelay));
    delay.addSlider((sl) => sl.setLimits(DELAY.min, DELAY.max, DELAY.step).setValue(s.hoverDelay).onChange(async (v) => {
      s.hoverDelay = v;
      delay.setDesc(delayDesc(v));
      await this.plugin.saveSettings();
    }));
  }
};

// src/main.ts
function globals() {
  return window;
}
var AsmlightPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.unloaded = false;
    this.hovers = [];
    // Prism replaces the contents of code blocks whose language it doesn't know.
    // If it runs after our post-processor, this puts the highlighting back.
    this.prismHook = (env) => {
      var _a;
      if (this.unloaded) return;
      const lang = languageForTag((_a = env.language) != null ? _a : "");
      if (lang && env.element) highlightCodeElement(env.element, lang);
    };
  }
  async onload() {
    this.settings = { ...DEFAULT_SETTINGS, ...await this.loadData() };
    if (this.unloaded) return;
    this.addSettingTab(new AsmlightSettingTab(this.app, this));
    this.attachHover(document);
    this.registerEvent(this.app.workspace.on("window-open", (_w, win) => this.attachHover(win.document)));
    for (const tag of ["regmap", "bitfield"]) {
      this.registerMarkdownCodeBlockProcessor(tag, (source, el3) => renderRegmap(source, el3));
    }
    for (const tag of ["memmap", "memory", "addrmap"]) {
      this.registerMarkdownCodeBlockProcessor(tag, (source, el3) => renderMemmap(source, el3));
    }
    registerCm5Modes(globals().CodeMirror, ALL_LANGUAGES);
    this.app.workspace.updateOptions();
    this.app.workspace.onLayoutReady(() => {
      if (!this.unloaded) this.rebuildEditors();
    });
    this.registerMarkdownPostProcessor((el3) => {
      if (this.unloaded) return;
      el3.querySelectorAll("pre > code").forEach((code) => {
        const lang = languageForCodeElement(code);
        if (lang) highlightCodeElement(code, lang);
      });
    });
    const Prism = await (0, import_obsidian2.loadPrism)();
    if (this.unloaded) return;
    Prism.hooks.add("after-highlight", this.prismHook);
    this.app.workspace.updateOptions();
    this.rerenderReadingViews();
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  attachHover(doc) {
    const controller = new HoverController(doc, {
      enabled: () => this.settings.hoverCards,
      requireModifier: () => this.settings.hoverRequiresModifier,
      delay: () => this.settings.hoverDelay
    });
    this.hovers.push(controller);
    this.registerDomEvent(doc.defaultView, "unload", () => {
      controller.destroy();
      this.hovers.splice(this.hovers.indexOf(controller), 1);
    });
  }
  /** Reading view caches rendered sections; force a re-render so toggling the plugin takes effect. */
  rerenderReadingViews() {
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      if (leaf.view instanceof import_obsidian2.MarkdownView) leaf.view.previewMode.rerender(true);
    }
  }
  /**
   * Live Preview and Source mode cache each code block's parse, including which
   * mode a fence resolved to. Notes already open when the plugin loads (every
   * restored tab at startup) parsed our fences as plain text, and updateOptions()
   * keeps that cache, so reopen those editors to parse them again.
   */
  rebuildEditors() {
    var _a;
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      if (leaf.view instanceof import_obsidian2.MarkdownView && leaf.view.getMode() === "source") {
        void ((_a = leaf.rebuildView) == null ? void 0 : _a.call(leaf));
      }
    }
  }
  onunload() {
    var _a, _b, _c, _d;
    this.unloaded = true;
    for (const h of this.hovers.splice(0)) h.destroy();
    unregisterCm5Modes(globals().CodeMirror, ALL_LANGUAGES);
    const hooks = (_c = (_b = (_a = globals().Prism) == null ? void 0 : _a.hooks) == null ? void 0 : _b.all) == null ? void 0 : _c["after-highlight"];
    const i = (_d = hooks == null ? void 0 : hooks.indexOf(this.prismHook)) != null ? _d : -1;
    if (hooks && i >= 0) hooks.splice(i, 1);
    this.app.workspace.updateOptions();
    window.setTimeout(() => {
      this.rerenderReadingViews();
      this.rebuildEditors();
    }, 0);
  }
};

/* nosourcemap */