import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, MapPin, AlertCircle, CheckCircle2, Calendar, Loader2, Clock, Phone, Linkedin, X, ExternalLink, Shield, FileText, Briefcase } from 'lucide-react';
import { Logo } from './Logo';

export function ContactAndFooter() {
  const [activeTab, setActiveTab] = useState<'bookCall' | 'message'>('bookCall');
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'careers' | null>(null);
  
  // Calculate tomorrow's date string as default min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: minDateStr,
    preferredTime: '09:00 AM - 10:00 AM',
    companySize: '1-50 employees',
    challenge: 'Customer Support Scaling',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (activeTab === 'bookCall' && !formData.preferredDate) {
      newErrors.preferredDate = 'Please select a date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (validate()) {
      setIsSubmitting(true);
      try {
        const payload = {
          ...formData,
          isBookingCall: activeTab === 'bookCall'
        };

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
          setIsSubmitted(true);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            preferredDate: minDateStr,
            preferredTime: '09:00 AM - 10:00 AM',
            companySize: '1-50 employees',
            challenge: 'Customer Support Scaling',
            message: ''
          });
          setTimeout(() => setIsSubmitted(false), 5000);
        } else {
          setServerError(data.error || 'Failed to submit request. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred during form submission:', error);
        setServerError('Network error. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <>
      <section id="contact" className="py-32 relative bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to scale your operations?
              </h2>
              <p className="text-lg text-gray-400 mb-12 max-w-md">
                Book a discovery call with our operations architects. Select your preferred date and time slot, and we'll design a hybrid scaling strategy tailored to your growth goals.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email Us</h4>
                    <a href="mailto:hello@evoqsolutions.co" className="text-white font-medium hover:text-blue-400 transition-colors">hello@evoqsolutions.co</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Global HQ</h4>
                    <p className="text-white font-medium">Faridabad, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h3 className="text-2xl font-semibold text-white">
                  {activeTab === 'bookCall' ? 'Schedule a Discovery Call' : 'Send us a Message'}
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-lg p-1 flex w-fit">
                  <button 
                    onClick={() => setActiveTab('bookCall')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'bookCall' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Calendar className="w-4 h-4" />
                    Book Call
                  </button>
                  <button 
                    onClick={() => setActiveTab('message')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'message' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Mail className="w-4 h-4" />
                    Message
                  </button>
                </div>
              </div>
              
              <div className="relative min-h-[460px]">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-5" 
                      onSubmit={handleSubmit}
                    >
                      {/* Name Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5 relative">
                          <label className="text-xs font-medium text-gray-400">First Name *</label>
                          <input 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full bg-white/5 border ${errors.firstName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`} 
                            placeholder="John" 
                          />
                          {errors.firstName && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3 h-3" /> {errors.firstName}
                            </motion.p>
                          )}
                        </div>
                        <div className="space-y-1.5 relative">
                          <label className="text-xs font-medium text-gray-400">Last Name *</label>
                          <input 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full bg-white/5 border ${errors.lastName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`} 
                            placeholder="Doe" 
                          />
                          {errors.lastName && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3 h-3" /> {errors.lastName}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      
                      {/* Contact Info Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5 relative">
                          <label className="text-xs font-medium text-gray-400">Work Email *</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`} 
                            placeholder="john@company.com" 
                          />
                          {errors.email && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3 h-3" /> {errors.email}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-1.5 relative">
                          <label className="text-xs font-medium text-gray-400 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-blue-400" /> Phone Number
                          </label>
                          <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors" 
                            placeholder="+1 (555) 000-0000" 
                          />
                        </div>
                      </div>

                      {/* Date and 1-Hour Time Slot fields for Book Call tab */}
                      {activeTab === 'bookCall' && (
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl space-y-4 my-2">
                          <div className="flex items-center gap-2 text-blue-400 font-medium text-xs uppercase tracking-wider">
                            <Calendar className="w-4 h-4" /> Preferred Call Schedule (1-Hour Slots)
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-gray-300 flex items-center gap-1">
                                Preferred Date *
                              </label>
                              <input 
                                type="date" 
                                name="preferredDate"
                                value={formData.preferredDate}
                                min={minDateStr}
                                onChange={handleChange}
                                className="w-full bg-[#161b26] border border-blue-500/30 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors appearance-none"
                              />
                              {errors.preferredDate && (
                                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                                  <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-gray-300 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-blue-400" /> Time Slot *
                              </label>
                              <select 
                                name="preferredTime"
                                value={formData.preferredTime}
                                onChange={handleChange}
                                className="w-full bg-[#161b26] border border-blue-500/30 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors appearance-none"
                              >
                                <option className="bg-[#111]">09:00 AM - 10:00 AM</option>
                                <option className="bg-[#111]">10:00 AM - 11:00 AM</option>
                                <option className="bg-[#111]">11:00 AM - 12:00 PM</option>
                                <option className="bg-[#111]">12:00 PM - 01:00 PM</option>
                                <option className="bg-[#111]">01:00 PM - 02:00 PM</option>
                                <option className="bg-[#111]">02:00 PM - 03:00 PM</option>
                                <option className="bg-[#111]">03:00 PM - 04:00 PM</option>
                                <option className="bg-[#111]">04:00 PM - 05:00 PM</option>
                                <option className="bg-[#111]">05:00 PM - 06:00 PM</option>
                                <option className="bg-[#111]">Flexible / Any Time</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Company details row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-gray-400">Company Size</label>
                          <select 
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                          >
                            <option className="bg-[#111]">1-50 employees</option>
                            <option className="bg-[#111]">51-200 employees</option>
                            <option className="bg-[#111]">201-500 employees</option>
                            <option className="bg-[#111]">500+ employees</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-gray-400">Primary Challenge</label>
                          <select 
                            name="challenge"
                            value={formData.challenge}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                          >
                            <option className="bg-[#111]">Customer Support Scaling</option>
                            <option className="bg-[#111]">Back-office Automation</option>
                            <option className="bg-[#111]">Process Documentation</option>
                            <option className="bg-[#111]">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Message / Notes textarea */}
                      <div className="space-y-1.5 relative">
                        <label className="text-xs font-medium text-gray-400">
                          {activeTab === 'bookCall' ? 'Call Agenda / Notes (Optional)' : 'Message'}
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleTextareaChange}
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors resize-none overflow-hidden"
                          placeholder={activeTab === 'bookCall' ? 'What would you like to cover on the call?' : 'Tell us about your operational goals...'}
                        />
                      </div>
                      
                      {serverError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{serverError}</span>
                        </div>
                      )}
                      
                      <div className="pt-2">
                        <button
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Submitting Request...
                            </>
                          ) : (
                            <>
                              {activeTab === 'bookCall' ? 'Book Discovery Call' : 'Send Message'}
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-2">Inquiries sent directly to hello@evoqsolutions.co</p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 bg-emerald-400/10 border border-emerald-400/20 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                      </motion.div>
                      <motion.h4 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-semibold text-white mb-2"
                      >
                        {activeTab === 'bookCall' ? 'Call Request Received!' : 'Message Received!'}
                      </motion.h4>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 max-w-sm mx-auto text-sm"
                      >
                        Thank you for reaching out. Our operations team has received your request and will confirm your preferred schedule via email at <strong>hello@evoqsolutions.co</strong>.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fully Working Responsive Footer */}
      <footer className="bg-[#05060c] pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            
            {/* Column 1: Brand & Bio */}
            <div className="space-y-4">
              <Logo size="md" />
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs pt-2">
                Transforming business operations by combining elite global talent with cutting-edge AI automation.
              </p>
              <div className="pt-2 space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Faridabad, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  <a href="mailto:hello@evoqsolutions.co" className="hover:text-white transition-colors">hello@evoqsolutions.co</a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Services & Solutions</a></li>
                <li><a href="#ai-advantage" className="hover:text-blue-400 transition-colors">AI Advantage</a></li>
                <li><a href="#process" className="hover:text-blue-400 transition-colors">Our Methodology</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors">The EVOQ Difference</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Book a Call</a></li>
              </ul>
            </div>

            {/* Column 3: Legal & Modals */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Company & Legal</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="hover:text-blue-400 transition-colors text-left flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-emerald-400" /> Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('terms')} className="hover:text-blue-400 transition-colors text-left flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-blue-400" /> Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('careers')} className="hover:text-blue-400 transition-colors text-left flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3 text-purple-400" /> Careers
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Social & Connect */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Connect With Us</h4>
              <p className="text-xs text-gray-400">Follow our journey and stay updated on operational insights.</p>
              
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.linkedin.com/company/evoq-solutions/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/20 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-md group"
                  title="EVOQ Solutions on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>

                <a 
                  href="mailto:hello@evoqsolutions.co" 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-600/20 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-md group"
                  title="Email EVOQ Solutions"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div>
              &copy; {new Date().getFullYear()} EVOQ Solutions. All rights reserved. Not a typical BPO.
            </div>
            <div className="flex gap-6">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-gray-300 transition-colors">Privacy</button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-gray-300 transition-colors">Terms</button>
              <a href="https://www.linkedin.com/company/evoq-solutions/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Footer Legal & Careers Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f121e] border border-white/15 rounded-3xl p-8 max-w-xl w-full relative shadow-2xl overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === 'privacy' && (
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-2">
                    <Shield className="w-4 h-4" /> Privacy Policy
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Data Privacy & Security</h3>
                  <div className="text-xs text-gray-300 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-2">
                    <p>At EVOQ Solutions, we prioritize the protection and security of your corporate and customer data.</p>
                    <p><strong>1. Data Collection:</strong> Information submitted via our consultation forms is used strictly to establish service agreements and respond to operational inquiries.</p>
                    <p><strong>2. Enterprise Compliance:</strong> We adhere to strict enterprise security and GDPR standards. No client data is ever sold, leased, or shared with unauthorized third parties.</p>
                    <p><strong>3. Security Infrastructure:</strong> All data transmissions are encrypted using 256-bit SSL protocols.</p>
                    <p>For questions regarding our privacy practices, contact us at <strong>hello@evoqsolutions.co</strong>.</p>
                  </div>
                </div>
              )}

              {activeModal === 'terms' && (
                <div>
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold mb-2">
                    <FileText className="w-4 h-4" /> Terms of Service
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Terms & Conditions</h3>
                  <div className="text-xs text-gray-300 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-2">
                    <p>Welcome to EVOQ Solutions. By utilizing our operational services or submitting inquiries through this portal, you agree to these terms.</p>
                    <p><strong>1. Services Overview:</strong> EVOQ Solutions provides hybrid AI and human operations management, customer support engineering, and back-office automation.</p>
                    <p><strong>2. Service Level Agreements (SLAs):</strong> Specific operational metrics, uptime guarantees, and response time SLAs are defined in individual Master Services Agreements (MSAs).</p>
                    <p><strong>3. Intellectual Property:</strong> All customized workflows, SOP documentation, and operational assets created for your organization remain your exclusive property.</p>
                  </div>
                </div>
              )}

              {activeModal === 'careers' && (
                <div>
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold mb-2">
                    <Briefcase className="w-4 h-4" /> Careers at EVOQ
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Join Our Global Operations Team</h3>
                  <div className="text-xs text-gray-300 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-2">
                    <p>We are constantly seeking top operational architects, AI support specialists, and customer success leaders to join our team in <strong>Faridabad, India</strong> and remote global locations.</p>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                      <div className="text-white font-semibold">Current Openings:</div>
                      <div>• AI Operations Architect</div>
                      <div>• Customer Success Lead (L2/L3)</div>
                      <div>• Process Automation Engineer</div>
                    </div>
                    <p>Send your CV and portfolio to <a href="mailto:hello@evoqsolutions.co" className="text-blue-400 underline">hello@evoqsolutions.co</a>.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
