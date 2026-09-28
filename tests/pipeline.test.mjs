import test from 'node:test';
import assert from 'node:assert/strict';

const classify = input => /\?$|can |is it true|employees can/i.test(input) ? 'Claim' : input.trim().split(/\s+/).length < 4 ? 'Topic' : /never|use |clean|wear|switch|avoid|do not|don.t/i.test(input) ? 'Advice' : 'Information';
const meaningLock = (fact, core, context=[]) => ({ original_information:fact, core_message:core, critical_context:context, allowed_humor:true, allowed_exaggeration:false, must_preserve:[core,...context] });
const validate = meme => ({ meaning_preserved:/otp/.test(meme.toLowerCase()) && !/guaranteed/.test(meme.toLowerCase()), new_claim_detected:/guaranteed/.test(meme.toLowerCase()) });
test('classifies direct safety advice',()=>assert.equal(classify('Never share your OTP with strangers.'),'Advice'));
test('classifies a short input as a topic',()=>assert.equal(classify('UPI scams'),'Topic'));
test('creates a locked, non-exaggerating meaning representation',()=>{const lock=meaningLock('Never share OTPs','Keep OTP private',['Unexpected callers']);assert.equal(lock.allowed_exaggeration,false);assert.equal(lock.must_preserve.length,2)});
test('validator rejects unsupported guarantees',()=>{const result=validate('Your OTP is guaranteed safe');assert.equal(result.meaning_preserved,false);assert.equal(result.new_claim_detected,true)});
test('demo pipeline preserves OTP action',()=>{const lock=meaningLock('Never share OTPs','Keep OTP private');const result=validate('SCAMMER: OTP please. ME: no, my OTP stays private.');assert.ok(lock.core_message.includes('OTP'));assert.equal(result.meaning_preserved,true)});
