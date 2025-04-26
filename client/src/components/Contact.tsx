import { forwardRef, useState, useEffect, Suspense } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { 
  Phone, 
  Mail, 
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(3, {
    message: "Subject must be at least 3 characters.",
  }).optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const mutation = useMutation({
    mutationFn: (values: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', values);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(values: ContactFormValues) {
    mutation.mutate(values);
  }
  
  return (
    <section 
      id="contact" 
      ref={ref}
      className={`py-20 md:py-32 ${
        isDark 
          ? 'bg-gradient-to-b from-deep-space to-midnight' 
          : 'bg-gradient-to-b from-gray-50 to-gray-100'
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="font-code text-neon-cyan">&lt;contact&gt;</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Get In Touch</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Ready to start your next project? Reach out to discuss how we can help bring your vision to life.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            className="glass rounded-lg p-8 animate-glow"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          className={`w-full px-4 py-2 rounded-md ${
                            isDark 
                              ? 'bg-midnight/50 border-white/10 focus:border-neon-cyan text-white' 
                              : 'bg-gray-100/70 border-gray-300 focus:border-electric-purple text-gray-800'
                          } border focus:ring-2 focus:ring-neon-cyan/20 transition-all`} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          className={`w-full px-4 py-2 rounded-md ${
                            isDark 
                              ? 'bg-midnight/50 border-white/10 focus:border-neon-cyan text-white' 
                              : 'bg-gray-100/70 border-gray-300 focus:border-electric-purple text-gray-800'
                          } border focus:ring-2 focus:ring-neon-cyan/20 transition-all`} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="What's this about?" 
                          className={`w-full px-4 py-2 rounded-md ${
                            isDark 
                              ? 'bg-midnight/50 border-white/10 focus:border-neon-cyan text-white' 
                              : 'bg-gray-100/70 border-gray-300 focus:border-electric-purple text-gray-800'
                          } border focus:ring-2 focus:ring-neon-cyan/20 transition-all`} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project..." 
                          className={`w-full px-4 py-2 rounded-md ${
                            isDark 
                              ? 'bg-midnight/50 border-white/10 focus:border-neon-cyan text-white' 
                              : 'bg-gray-100/70 border-gray-300 focus:border-electric-purple text-gray-800'
                          } border focus:ring-2 focus:ring-neon-cyan/20 transition-all`}
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full px-8 py-3 rounded-md animate-gradient text-white font-semibold hover:opacity-90"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <div>
            <motion.div 
              className="glass rounded-lg p-8 mb-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neon-cyan/20 flex items-center justify-center mr-3">
                    <Phone className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neon-cyan/20 flex items-center justify-center mr-3">
                    <Mail className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>hello@glacium.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neon-cyan/20 flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>123 Innovation Drive, San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className={`h-10 w-10 rounded-full ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-200/50 hover:bg-gray-200/80'} flex items-center justify-center transition-colors`}>
                    <Twitter className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                  </a>
                  <a href="#" className={`h-10 w-10 rounded-full ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-200/50 hover:bg-gray-200/80'} flex items-center justify-center transition-colors`}>
                    <Instagram className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                  </a>
                  <a href="#" className={`h-10 w-10 rounded-full ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-200/50 hover:bg-gray-200/80'} flex items-center justify-center transition-colors`}>
                    <Linkedin className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                  </a>
                  <a href="#" className={`h-10 w-10 rounded-full ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-200/50 hover:bg-gray-200/80'} flex items-center justify-center transition-colors`}>
                    <Github className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="glass rounded-lg p-6 h-64"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Interactive Globe */}
              <div className={`w-full h-full rounded ${
                isDark ? 'bg-midnight/70' : 'bg-gray-200/70'
              } overflow-hidden`}>
                <Canvas camera={{ position: [0, 0, 2] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Suspense fallback={null}>
                    <mesh rotation={[0, 0, 0]}>
                      <sphereGeometry args={[1, 32, 32]} />
                      <meshStandardMaterial 
                        color={isDark ? "#1a1a2e" : "#e5e5e5"}
                        metalness={0.7}
                        roughness={0.3}
                      />
                      <OrbitControls 
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                      />
                    </mesh>
                    <Stars 
                      radius={100} 
                      depth={50} 
                      count={5000} 
                      factor={4} 
                      saturation={0} 
                      fade 
                      speed={1}
                    />
                  </Suspense>
                </Canvas>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
